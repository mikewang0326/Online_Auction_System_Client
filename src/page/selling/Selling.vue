<template>
  <div>
    <h3 id="title_bar">Selling Page</h3>

    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="createAuction">Create a auction</button>
    </div>

    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewAllAuctions">View all auctions</button>
    </div>

    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewActiveAuctions">View active auctions</button>
    </div>

    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewExpiredAuctions">View Expired auctions</button>
    </div>

    <div class="container">
      <button class="btn btn-primary pull-left" v-on:click="viewUpcomingAuctions">View upcoming auctions</button>
    </div>

  </div>
</template>

<script>
  const userHelper = require('../../utils/UserHelper');
  export default {
    name: 'SellingComponent',
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
      createAuction: function () {
        this.$router.push({ name: 'create_auction', params: { event: 'create_auction'}});
      },
      viewAllAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'all'}})
      },
      viewActiveAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'active'}})
      },
      viewExpiredAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'expired'}})
      },
      viewUpcomingAuctions: function () {
        this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'upcoming'}})
      },

    }
  }
</script>

<style scoped>
</style>

<style>
  #user_info_page {
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
