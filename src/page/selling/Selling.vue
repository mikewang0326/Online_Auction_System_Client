<template>
  <div>
    <h1>Selling Page</h1>

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
