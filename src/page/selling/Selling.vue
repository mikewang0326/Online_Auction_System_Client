<template>
  <div>
    <h3 id="title_bar">Selling Page</h3>

    <div id="login_reminder_layout" v-if="isNotLogin" class="text-left text-danger">{{ "Before you view any autcions, please login in first !" }}</div>


    <div id="arrow_button_layout">
      <button type="button" class="btn btn-warning btn-arrow-right" v-on:click="createAuction" >Create an auction</button>
    </div>


    <div id="view_auction_options">
      <div class="create_auction_layout">
        <button type="button" class="btn btn-warning btn-arrow-right" v-on:click="viewAllAuctions" >View all auctions</button>
      </div>

      <div class="arrow_button_layout">
        <button type="button" class="btn btn-warning btn-arrow-right" v-on:click="viewActiveAuctions" >View active auctions</button>
      </div>

      <div class="arrow_button_layout">
        <button type="button" class="btn btn-warning btn-arrow-right" v-on:click="viewExpiredAuctions" >View expired auctions</button>
      </div>

      <div class="arrow_button_layout">
        <button type="button" class="btn btn-warning btn-arrow-right" v-on:click="viewUpcomingAuctions" >View upcoming auctions</button>
      </div>
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

    computed:{
      isNotLogin:function () {
        return !userHelper.isLogin();
      }
    },

    methods: {
      createAuction: function () {
        if (userHelper.isLogin()) {
          this.$router.push({ name: 'create_auction', params: { event: 'create_auction'}});
        } else {
          this.$router.push('/user/login');
        }
      },
      viewAllAuctions: function () {
        if (userHelper.isLogin()) {
          this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'all'}})
        } else {
          this.$router.push('/user/login');
        }
      },
      viewActiveAuctions: function () {
        if (userHelper.isLogin()) {
          this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'active'}})
        } else {
          this.$router.push('/user/login');
        }
      },
      viewExpiredAuctions: function () {
        if (userHelper.isLogin()) {
          this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'expired'}})
        } else {
          this.$router.push('/user/login');
        }
      },
      viewUpcomingAuctions: function () {
        if (userHelper.isLogin()) {
          this.$router.push({ name: 'auction_list', params: { seller: userHelper.getUserInfo().id, status:'upcoming'}})
        } else {
          this.$router.push('/user/login');
        }
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

  #arrow_button_layout{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 20px 20px 20px 20px;
  }
  #view_auction_options{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 20px 20px 20px 20px;
  }

  #login_reminder_layout{
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

  .btn-arrow-right,
  .btn-arrow-left {
    position: relative;
    padding-left: 18px;
    padding-right: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .btn-arrow-right {
    padding-left: 36px;
  }

  .btn-arrow-left {
    padding-right: 36px;
  }

  .btn-arrow-right:before,
  .btn-arrow-right:after,
  .btn-arrow-left:before,
  .btn-arrow-left:after {
    /* make two squares (before and after), looking similar to the button */

    content: "";
    position: absolute;
    top: 5px;
    /* move it down because of rounded corners */

    width: 22px;
    /* same as height */

    height: 22px;
    /* button_outer_height / sqrt(2) */

    background: inherit;
    /* use parent background */

    border: inherit;
    /* use parent border */

    border-left-color: transparent;
    /* hide left border */

    border-bottom-color: transparent;
    /* hide bottom border */

    border-radius: 0px 4px 0px 0px;
    /* round arrow corner, the shorthand property doesn't accept "inherit" so it is set to 4px */

    -webkit-border-radius: 0px 4px 0px 0px;
    -moz-border-radius: 0px 4px 0px 0px;
  }

  .btn-arrow-right:before,
  .btn-arrow-right:after {
    transform: rotate(45deg);
    /* rotate right arrow squares 45 deg to point right */

    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
  }

  .btn-arrow-left:before,
  .btn-arrow-left:after {
    transform: rotate(225deg);
    /* rotate left arrow squares 225 deg to point left */

    -webkit-transform: rotate(225deg);
    -moz-transform: rotate(225deg);
    -o-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
  }

  .btn-arrow-right:before,
  .btn-arrow-left:before {
    /* align the "before" square to the left */

    left: -11px;
  }

  .btn-arrow-right:after,
  .btn-arrow-left:after {
    /* align the "after" square to the right */

    right: -11px;
  }

  .btn-arrow-right:after,
  .btn-arrow-left:before {
    /* bring arrow pointers to front */

    z-index: 1;
  }

  .btn-arrow-right:before,
  .btn-arrow-left:after {
    /* hide arrow tails background */

    background-color: khaki;

  }
</style>
