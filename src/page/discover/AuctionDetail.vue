<template>
  <div id="auction_detail">
    <h1>Auction Detail Page</h1>
    <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>


    <img src="https://trademe.tmcdn.co.nz/photoserver/plusw/786393634.jpg" class="img-thumbnail">

    <div>
      <h3>Title: {{ auction_info.title }}</h3>
      <h3>Seller: {{ auction_info.seller.username }}</h3>
      <h3>Start date: {{ auction_info.startDateTime }}</h3>
      <h3>End date: {{ auction_info.endDateTime }}</h3>
      <h3>Description: {{ auction_info.description }}</h3>
      <h3>Current Bid: {{ auction_info.currentBid }}</h3>
    </div>

    <div v-if="auction_info.bids.length > 0">
      <button type="button" class="btn btn-primary" data-toggle="collapse"
              data-target="#demo">
        Click to view all bid histories
      </button>

      <div id="demo" class="collapse out">
        <ol v-for="bid in auction_info.bids">
          <li> Amount: {{ bid.amount }} Datetime: {{ bid. datetime }} Buyerid: {{ bid.buyerId}} buyUsername: {{ bid. buyerUsername}}</li>
        </ol>
      </div>
    </div>

    <div v-else>
      <h3>No bid histories.</h3>
    </div>

    <div>
      <button v-if="auction_info.status.isSupportBid" type="button" class="btn btn-primary"
              data-toggle="modal" data-target="#deleteUserModal">
        Bid
      </button>
      <button v-if="auction_info.status.isLoginUserSeller == false" type="button" class="btn btn-primary" v-on:click="goToAuctionEditPage">
        Edit
      </button>
    </div>

    <div class = "modal fade" id = "deleteUserModal" tabindex = "-1" role = "dialog"
         aria-labelledby = "deleteUserModalLabel" aria-hidden = "true">
      <div class = "modal-dialog" role = "document">
        <div class = "modal-content">
          <div class = "modal-header">
            <h5 class = "modal-title" id = "deleteUserModalLabel" > Make a Bid </h5>
            <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
              <span aria-hidden = "true" > &times; </span>
            </button>

          </div>
          <div class = "modal-body">
            You should give a bid more than $ {{ auction_info.currentBid }}
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



  </div>
</template>

<script>
  import axios from '../../axios'
  const userHelper = require('../../utils/UserHelper')
  const auctionDetailResponseHelper = require('../../data/discover/GetAuctionResponseHelper');
  const makeBidResponseHelper = require('../../data/discover/MakeBidResponseHelper');

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
          status:{
            isLoginUserSeller: true, // enable edit button
            isSupportBid: true,     // enable bid button
          },
        },
        make_bid_amount: 0
      }
    },
    mounted: function () {
      this.getAuctionInfo();
    },

    computed: {
      // 一个 computed 属性的 getter 函数
      isSubmitButtonDisable: function () {
        let ret = true;
        if (this.make_bid_amount > this.auction_info.currentBid) {
          ret = false;
        }
        console.log('computed isSubmitButtonDisable :' + ret);
        return ret;
      }
    },
    methods: {
      getAuctionInfo: function () {

        this.status_message.content = "Now is loading, please wait...".toString();
        var auction_id = this.$route.params.auction_id;
        console.log("auction_id : " + auction_id);
        this.$http.get("http://localhost:4941/api/v1/auctions/" + auction_id)
          .then((response) => {
            console.log(response)
            this.status_message.content = "".toString()
            if (auctionDetailResponseHelper.isValid(response)) {
              this.auction_info = auctionDetailResponseHelper.formatData(response)
              console.log(this.auction_info);
            } else {
              this.status_message.content = auctionDetailResponseHelper.getErrorInfo(response)
            }
          }, function (error) {
            this.status_message.content = error;
          })
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

      isReadyToMakeABid: function() {
        return this.make_bid_amount <= this.currentBid;
      },

      goToAuctionEditPage: function () {
        alert('go to auction edit page');
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
    margin-top: 60px;
  }

  .img-thumbnail {
    height: 40px;
    width: 40px;
  }
</style>
