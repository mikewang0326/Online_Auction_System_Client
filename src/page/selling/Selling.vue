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
        this.$router.push('/create_auction');
      },
      viewAllAuctions: function () {
        alert('viewAllAuctions');
      },
      viewActiveAuctions: function () {
        alert('viewActiveAuctions');
      },
      viewExpiredAuctions: function () {
        alert('viewExpiredAuctions');
      },
      viewUpcomingAuctions: function () {
        alert('viewUpcomingAuctions');
      },

    }
  }
</script>
