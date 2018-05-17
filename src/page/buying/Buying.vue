<template>
  <div id="buying_page">
    <h3 id="title_bar">Buying Page</h3>
    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewAllAuctions">View all auctions</button>
    </div>
    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewWonAuctions">View won auctions</button>
    </div>
    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewActiveAuctions">View active auctions</button>
    </div>
    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewExpiredAuctions">View expired auctions</button>
    </div>
  </div>
</template>

<script>
  const userHelper = require('../../utils/UserHelper');
  export default {
    name: 'BuyingComponent',
    data() {
      return {
        status_message:{
          content: ''
        },
      }
    },
    mounted: function () {
    },

    methods: {
      viewAllAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { bidder: userHelper.getUserInfo().id, status:'all'}})
      },

      viewWonAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { winner: userHelper.getUserInfo().id, status:'all'}})
      },

      viewActiveAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { bidder: userHelper.getUserInfo().id, status:'active'}})
      },

      viewExpiredAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { bidder: userHelper.getUserInfo().id, status:'expired'}})
      },

    }
  }
</script>

<style scoped>
</style>

<style>
  #buying_page {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 0px;
  }

  #title_bar {
    background-color: darkgrey;
    margin: 5px 10px 5px 10px;
    padding: 10px 10px 10px 10px;
  }

  #user_basic_info{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }
  #bottom_bar{
    /*background-color: khaki;*/
    margin: 10px 10px 10px 10px;
    padding: 10px 0px 0px 0px;
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
