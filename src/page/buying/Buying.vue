<template>
  <div>
    <h1>Buying Page</h1>
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
