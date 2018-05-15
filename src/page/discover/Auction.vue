<template>
  <div id="auction">
    <h1>Auction Page</h1>
    <!--<div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>-->
    <img src="https://trademe.tmcdn.co.nz/photoserver/plusw/786393634.jpg" class="img-thumbnail">

    <div>
      <h3>Title: {{ auction_info.title }}</h3>
      <h3>Seller: {{ auction_info.seller.username }}</h3>
      <h3>Start date: {{ auction_info.startDateTime }}</h3>
      <h3>End date: {{ auction_info.endDateTime }}</h3>
      <h3>Description: {{ auction_info.description }}</h3>
      <h3>Current Bid: {{ auction_info.currentBid }}</h3>
    </div>

    <div>
      <button type="button" class="btn btn-primary" data-toggle="collapse"
              data-target="#demo">
        Click to view all bid histories
      </button>

      <div id="demo" class="collapse out">
        <ol v-if="auction_info.bids" v-for="bid in auction_info.bids">
          <li> Amount: {{ bid.amount }} Datetime: {{ bid. datetime }} Buyerid: {{ bid.buyerId}} buyUsername: {{ bid. buyerUsername}}</li>
        </ol>
      </div>
    </div>

    <div>
      <button v-if="auction_info.status.isSupportBid" type="button" class="btn btn-primary">
        Bid
      </button>
      <button v-if='auction_info.status.isLoginUserSeller 'type="button" class="btn btn-primary">
        Edit
      </button>
    </div>


  </div>
</template>

<script>
  import axios from '../../axios'
  const userHelper = require('../../utils/UserHelper')
  const responseHelper = require('../../data/discover/GetAuctionResponseHelper');

  export default {
    name: 'AuctionComponent',
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
        }
      }
    },
    mounted: function () {
      this.getAuctionInfo();
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
            if (responseHelper.isValid(response)) {
              this.auction_info = responseHelper.formatData(response)
              console.log(this.auction_info);
            } else {
              this.status_message.content = responseHelper.getErrorInfo(response)
            }
          }, function (error) {
            this.status_message.content = error;
          })
      },

      submitRegister: function () {
        this.$router.push('/user/register');
      }
    }
  }
</script>

<style scoped>
</style>

<style>
  #auction {
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
