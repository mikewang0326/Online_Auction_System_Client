<template>
  <div id="user_info_page">
    <h3 id="title_bar">User Page</h3>
    <div v-if="status_message.content" class="text-left text-danger">{{ status_message.content }}</div>

    <div id="user_basic_info">
      <h4>ID: {{ user.id }}</h4>
      <h4>Token: {{ user.token }}</h4>

      <h4>Username: {{ user_info.username }}</h4>
      <h4>Given name: {{ user_info.givenName }}</h4>
      <h4>Family name: {{ user_info.familyName }}</h4>
      <h4 v-if="isLoginUser">Email: {{ user_info.email }}</h4>
      <h4 v-if="isLoginUser">Acount balance: {{ user_info.accountBalance }}</h4>
    </div>


    <div id="bottom_bar" v-if="isLoginUser" class="checkbox" >
      <button v-on:click="logout"  class="btn btn-primary pull-left">Logout</button>
    </div>
  </div>
</template>
<script>
  import axios from '../../axios';
  const userHelper = require('../../utils/UserHelper')
  const responseHelper = require('../../data/discover/GetUserInfoResponseHelper');
  export default {
    data () {
      return {
        status_message:{
          content: ''
        },
        user_id: null,
        isLogin: false,
        user:{
          id:'',
          token:''
        },

        user_info:{

        }
      }
    },

    mounted: function () {
      this.init()
    },

    computed: {
      isLoginUser:function(){
        return userHelper.isCurrentUser(this.user_id)
      },
    },

    methods: {
      init: function () {
        /**
         * 1, if user_id = null, redirect to login page
         *
         * 2, if user is login user, show all information
         *
         * 3, if user is not login user, show part information
         */


        this.user_id = this.$route.params.user_id;
        this.isLogin = userHelper.isLogin();
        this.user = userHelper.getUserInfo();
        if (undefined != this.user_id && null != this.user_id) {
          this.getUserInfo();
        }  else if (this.isLogin) {
          this.user_id = userHelper.getUserInfo().id;
          this.getUserInfo();
        } else {
          this.$router.push('/user/login');
        }
      },

      getUserInfo: function () {
        this.status_message.content = "Now is loading, please wait...".toString();
        console.log("user_id : " + this.user_id);
        let axiosConfig = {
          headers: {
            'Content-Type':'application/json',
            'X-Authorization': userHelper.getUserInfo().token
          }
        };
        console.log("user_id : " + this.user_id);
        axios.get("http://localhost:4941/api/v1/users/" + parseInt(this.user_id), axiosConfig)
          .then((response) => {
            console.log(response)
            this.status_message.content = "".toString()
            if (responseHelper.isValid(response)) {
              this.user_info = response['data'];
            } else {
              this.status_message.content = this.responseHelper.getErrorInfo(response).toString();
            }
          }).catch((error) => {
          this.status_message.content = error.toString();
        });
      },

      logout: function () {
        console.log('logout .....')
        userHelper.clearLoginStatus();
        this.isLogin = userHelper.isLogin();
        if (!this.isLogin) {
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
    margin-top: 60px;
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

