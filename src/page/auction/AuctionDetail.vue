<template>
  <div id="auction_detail">
    <h3 id="title_bar">Auction Detail Page</h3>
    <div v-if="status_message.content" class="text-left text-danger">{{ status_message.content }}</div>
    <div id="div_upload_photo">
      <img v-bind:src="photoUrl" class="img-thumbnail">

      <button type="button" class="btn btn-primary"
              data-toggle="modal" v-bind:disabled="isEditButtonDisable" data-target="#uploadPhotoModal">
        Click to add a photo
      </button>

      <div v-if="upload_info.message" class="text-left text-danger">{{ upload_info.message }}</div>
    </div>


    <div id="auction_basic_info">
      <h4>Title: {{ auction_info.title }}</h4>
      <h4>Seller: {{ auction_info.seller.username }}</h4>
      <h4>Start date: {{ auction_info.startDateTime }}</h4>
      <h4>End date: {{ auction_info.endDateTime }}</h4>
      <h4>Reserve Price: {{ auction_info.reservePrice }}</h4>
      <h4>Starting bid: {{ auction_info.startingBid }}</h4>
      <h4>Description: {{ auction_info.description }}</h4>
      <h4>Current Bid: {{ auction_info.currentBid }}</h4>
    </div>

    <div id="auction_bid_history">
      <button v-bind:disabled="isBidHistoryButtonDisable" type="button" class="btn btn-primary" data-toggle="collapse"
              data-target="#demo">
        Click to view all bid histories
      </button>

      <div id="demo" class="collapse out">
        <ul v-for="bid in orderedBids">
          <li> Amount: <strong>{{ bid.amount }}</strong> {{ bid. datetime }} <router-link :to="{ name :'user', params:{ user_id: bid.buyerId }}">{{ bid. buyerUsername}}</router-link></li>
        </ul>
      </div>
      <h6 v-if="isBidHistoryButtonDisable">No bid histories.</h6>
    </div>

    <div id="handle_auction_layout">
      <button type="button" class="btn btn-primary"
              data-toggle="modal" v-bind:disabled="isBidButtonDisable" data-target="#makeBidModal">
        Bid
      </button>
      <button v-bind:disabled="isEditButtonDisable" type="button" class="btn btn-primary" v-on:click="goToAuctionEditPage">
        Edit
      </button>
    </div>

    <!-- make a bid-->
    <div class = "modal fade" id = "makeBidModal" tabindex = "-1" role = "dialog"
         aria-labelledby = "makeBidModalLabel" aria-hidden = "true">
      <div class = "modal-dialog" role = "document">
        <div class = "modal-content">
          <div class = "modal-header">
            <h5 class = "modal-title" id = "makeBidModalLabel" > Make a Bid </h5>
            <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
              <span aria-hidden = "true" > &times; </span>
            </button>

          </div>
          <div class = "modal-body">
            You should give a bid more than $ {{ minBidAmount }}
            <form @submit.prevent="prepareForBid">
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Bid you will make</label>
                <input v-model="make_bid_amount" type="number" class="form-control"
                       id="number" step="0.01" placeholder="Please make a bid" required>
              </div>
              <div v-if="auction_info.title" class="text-center text-danger">{{ status_message.content }}</div>

              <div class = "modal-footer">
                <button type = "submit" class = "btn btn-primary" data-dismiss = "modal" v-on:click="prepareForBid" v-bind:disabled="isSubmitButtonDisable">
                  Confirm
                </button>
                <button type = "button" class = "btn btn-secondary" data-dismiss = "modal">
                  Cancel
                </button>

              </div>

            </form>
          </div>


        </div>
      </div>
    </div>

    <!-- upload photo -->
    <div class = "modal fade" id = "uploadPhotoModal" tabindex = "-1" role = "dialog"
         aria-labelledby = "makeBidModalLabel" aria-hidden = "true">
      <div class = "modal-dialog" role = "document">
        <div class = "modal-content">
          <div class = "modal-header">
            <h5 class = "modal-title" id = "uploadPhotoModalLabel" > Upload Photo </h5>
            <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
              <span aria-hidden = "true" > &times; </span>
            </button>

          </div>
          <div class = "modal-body">
            Choose one jpeg or png photo to upload
            <form @submit.prevent="uploadPhoto">
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label"></label>
                <input type="file" @change="onFileChanged">
              </div>
              <div v-if="auction_info.title" class="text-center text-danger">{{ status_message.content }}</div>

              <div class = "modal-footer">
                <button type = "submit" class = "btn btn-primary" data-dismiss = "modal" v-on:click="uploadPhoto" v-bind:disabled="isUploadButtonDisable">
                  Upload
                </button>
                <button type = "button" class = "btn btn-secondary" data-dismiss = "modal">
                  Cancel
                </button>

              </div>

            </form>
          </div>


        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import axios from '../../axios'
  var _ = require('lodash');
  const userHelper = require('../../utils/UserHelper')
  const timeHelper = require('../../utils/TimeHelper');
  const auctionDetailResponseHelper = require('../../data/discover/GetAuctionResponseHelper');
  const makeBidResponseHelper = require('../../data/discover/MakeBidResponseHelper');
  const uploadPhotoResponseHelper = require('../../data/discover/UploadPhotoResponseHelper');

  export default {
    name: 'AuctionDetailComponent',
    // props: {
    //   errorMessage: {
    //     type: String,
    //     required: false,
    //     default: ''
    //   },
    //
    // },
    data() {
      return {
        status_message:{
          content: ''
        },
        selectedFile: null,
        photoUrl: "http://localhost:4941/api/v1/auctions/"+ this.$route.params.auction_id + "/photos",
        upload_info:{
          message:""
        },

        auction_info: {
          categoryId: '',
          categoryTitle: '',
          title: '',
          reservePrice: '',
          startDateTime: '',
          endDateTime: '',
          description: '',
          creationDateTime: '',
          startingBid: '',
          currentBid: '',
          seller: {
            id: '',
            username: ''
          },
          bids: [],
        },
        make_bid_amount: 0
      }
    },
    mounted: function () {
      this.getAuctionInfo();
    },

    computed: {
      minBidAmount:function() {
        let ret = this.auction_info.startingBid;
        if (this.auction_info.currentBid > 0) {
          ret = this.auction_info.currentBid;
        }
        return ret;
      },
      isBidHistoryButtonDisable:function(){
        let ret = true;
        if(this.auction_info.bids.length > 0) {
          ret = false;
        }

        console.log('computed isBidHistoryButtonDisable :' + ret);
        return ret;
      },

      isSubmitButtonDisable: function () {
        let ret = true;
        if (this.make_bid_amount > this.auction_info.currentBid) {
          ret = false;
        }

        console.log('computed isSubmitButtonDisable :' + ret);
        return ret;
      },

      isBidButtonDisable:function () {
        let ret = true;
        if(!userHelper.isCurrentUser(this.auction_info.seller.id)) {
          if (timeHelper.convertFormattedTimeToMillseconds(this.auction_info.startDateTime) < new Date().getTime()
            && timeHelper.convertFormattedTimeToMillseconds(this.auction_info.endDateTime) > new Date().getTime()) {
            ret = false;
          }
        }

        console.log('computed isBidButtonDisable :' + ret);
        return ret;
      },

      isEditButtonDisable:function () {
        let ret = true;
        if(userHelper.isCurrentUser(this.auction_info.seller.id)) {
          if (timeHelper.convertFormattedTimeToMillseconds(this.auction_info.startDateTime) > new Date().getTime()
            && timeHelper.convertFormattedTimeToMillseconds(this.auction_info.endDateTime) > new Date().getTime()) {
            ret = false;
          }
        }

        console.log('computed isEditButtonDisable :' + ret);
        return ret;
      },


      isUploadButtonDisable: function () {
        let ret = true;
        if (this.selectedFile != null) {
          ret = false;
        }

        console.log('computed isSubmitButtonDisable :' + ret);
        return ret;
      },

      orderedBids: function () {
        return _.orderBy(this.auction_info.bids, ['datetime'], ['desc'])
      }

    },
    methods: {
      onFileChanged (event) {
        console.log('OnFileChanged()')
        this.selectedFile = event.target.files[0]
        console.log('OnFileChanged() selectedFile :' + this.selectedFile)
      },

      uploadPhoto() {
        console.log('uploadPhoto()')
        this.upload_info.message = "Uploading, please wait".toString();
        // upload file, get it from this.selectedFile
        let axiosConfig = {
          headers: {
            'Content-Type':'image/png',
            'X-Authorization': userHelper.getUserInfo().token
          }
        };

        axios.post(
          'http://localhost:4941/api/v1/auctions/'+ this.$route.params.auction_id +'/photos',
          this.selectedFile, axiosConfig).then(response => {
            console.log(response);
          if (uploadPhotoResponseHelper.isValid(response)) {
            this.photoUrl = this.createReplaceablePhotoUrl();
            this.selectedFile = null;
            this.upload_info.message = "";
          } else {
            this.upload_info.message = this.uploadPhotoResponseHelper.getErrorInfo(response).toString();
          }
        }).catch((error) => {
          this.upload_info.message = error.toString();
        });;
      },

      createReplaceablePhotoUrl () {
        return "http://localhost:4941/api/v1/auctions/"+ this.$route.params.auction_id + "/photos?" + Math.random()*100;
      },

      getAuctionInfo: function () {
        this.status_message.content = "Now is loading, please wait...".toString();
        var auction_id = this.$route.params.auction_id;
        console.log("auction_id : " + auction_id);
        axios.get("http://localhost:4941/api/v1/auctions/" + auction_id)
          .then((response) => {
            console.log(response)
            this.status_message.content = "".toString()
            if (auctionDetailResponseHelper.isValid(response)) {
              this.auction_info = auctionDetailResponseHelper.formatData(response)
              console.log(this.auction_info);
            } else {
              this.status_message.content = this.auctionDetailResponseHelper.getErrorInfo(response)
            }
          }).catch((error) => {
          this.status_message.content = error.toString();
        });
      },

      prepareForBid: function () {
        console.log("make_bid_amount : " + this.make_bid_amount);
        this.status_message.content = "Now logining, please wait".toString();
        let axiosConfig = {
          headers: {
            'Content-Type':'application/json',
            'X-Authorization': userHelper.getUserInfo().token
          }
        };

        axios.post('/auctions/' + this.$route.params.auction_id + '/bids?amount=' + this.make_bid_amount, {}, axiosConfig)
          .then((response) => {
            // if login succeed, save token, and return to user page
            console.log(response)
            if (makeBidResponseHelper.isValid(response)) {
               this.getAuctionInfo();
            } else {
              this.status_message.content = makeBidResponseHelper.getErrorInfo(response);
            }

          })
          .catch((error) => {
            this.status_message.content = error.toString();
          });
      },

      goToAuctionEditPage: function () {
        this.$router.push({ name: 'create_auction', params: { event: 'update_auction', auction_id:this.$route.params.auction_id, auction_info:this.auction_info}})
      }
    }
  }
</script>

<style scoped>
</style>

<style>
  #auction_detail {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 20px;
  }

  #title_bar {
    background-color: darkgrey;
    margin: 5px 10px 5px 10px;
    padding: 10px 10px 10px 10px;
  }

  #div_upload_photo{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }
  #auction_basic_info{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  #auction_bid_history{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  #handle_auction_layout{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  .img-thumbnail {
    height: 100px;
    width: 100px;
  }
</style>
