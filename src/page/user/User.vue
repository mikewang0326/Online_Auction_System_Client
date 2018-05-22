<template>
  <div id="user_info_page">
    <h3 id="title_bar">User Page</h3>
    <div v-if="status_message.content" class="text-left text-danger">{{ status_message.content }}</div>

    <div id="div_user_photo">
      <img src="../../assets/avatar_default.png" class="img-thumbnail">

    </div>

    <div v-if="isLoginUser" id="layout_edit_user_info">
      <button type="button" class="btn btn-primary"
              data-toggle="modal" v-bind:disabled="!isLoginUser" data-target="#editUserInfoModal">
        Edit User Information
      </button>
      <div v-if="user_edit_info_status" class="text-left text-danger">{{ user_edit_info_status }}</div>
    </div>


    <div id="user_basic_info">
      <!--<h4>ID: {{ user.id }}</h4>-->
      <!--<h4>Token: {{ user.token }}</h4>-->

      <h4>Username: {{ user_info.username }}</h4>
      <h4>Given name: {{ user_info.givenName }}</h4>
      <h4>Family name: {{ user_info.familyName }}</h4>
      <h4 v-if="isLoginUser">Email: {{ user_info.email }}</h4>
      <h4 v-if="isLoginUser">Acount balance: {{ user_info.accountBalance }}</h4>
    </div>


    <div id="bottom_bar" v-if="isLoginUser" class="checkbox" >
      <button v-on:click="logout"  class="btn btn-primary pull-left">Logout</button>
    </div>


    <!-- Edit user info-->
    <div class = "modal fade" id = "editUserInfoModal" tabindex = "-1" role = "dialog"
         aria-labelledby = "editUserInfoModalLabel" aria-hidden = "true">
      <div class = "modal-dialog" role = "document">
        <div class = "modal-content">
          <div class = "modal-header">
            <h5 class = "modal-title" id = "makeBidModalLabel" > Edit User Info </h5>
            <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
              <span aria-hidden = "true" > &times; </span>
            </button>

          </div>
          <div class = "modal-body">
            Please change your information
            <form @submit.prevent="prepareForBid">
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Given name</label>
                <input v-model="user_edit_info.givenName" type="text" class="form-control"
                       id="edit_info_givenname" step="0.01" placeholder="given name" required>

              </div>
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Family Name</label>
                <input v-model="user_edit_info.familyName" type="text" class="form-control" id="edit_info_familyname"
                       placeholder="family name" autofocus required>
              </div>

              <!--<div v-if="auction_info.title" class="text-center text-danger">{{ status_message.content }}</div>-->

              <div class = "modal-footer">
                <button type = "submit" class = "btn btn-primary" data-dismiss = "modal" v-on:click="editUserInfo" v-bind:disabled="isSubmitButtonDisable">
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
  import axios from '../../axios';
  const userHelper = require('../../utils/UserHelper')
  const getUserInfoResponseHelper = require('../../data/discover/GetUserInfoResponseHelper');
  const editUserInfoResponseHelper = require('../../data/user/EditUserResponseHelper');
  const validator = require('validator');
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

        },

        user_edit_info:{
            givenName:'',
            familyName:'',
        },
        user_edit_info_status:'',

        make_bid_amount:0,

      }
    },

    mounted: function () {
      this.init()
    },

    computed: {
      isLoginUser:function(){
        return userHelper.isCurrentUser(this.user_id)
      },

      isSubmitButtonDisable: function () {
        let ret = true;
        if (this.user_edit_info.givenName != this.user_info.givenName
            || this.user_edit_info.familyName != this.user_info.familyName) {
          if (!validator.isEmpty(this.user_edit_info.givenName)
            || !validator.isEmpty(this.user_edit_info.familyName)) {
            ret = false;
          }
        }
        console.log('computed isSubmitButtonDisable :' + ret);
        return ret;
      },
    },

    watch:{
      user_info: function (newUserInfo, oldUserInfo) {
        console.log('watch checkedNames newUserInfo"' + newUserInfo + " oldUserInfo:" + oldUserInfo);
        this.user_edit_info.givenName = newUserInfo.givenName;
        this.user_edit_info.familyName = newUserInfo.familyName;
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
            if (getUserInfoResponseHelper.isValid(response)) {
              this.user_info = response['data'];
            } else {
              this.status_message.content = this.getUserInfoResponseHelper.getErrorInfo(response).toString();
            }
          }).catch((error) => {
          this.status_message.content = 'Get user information failed, please try again !' .toString();
        });
      },

      editUserInfo: function () {
        console.log("editUserInfo : " + this.editUserInfo);
        this.user_edit_info_status = "Now editing, please wait".toString();
        let axiosConfig = {
          headers: {
            'Content-Type':'application/json',
            'X-Authorization': userHelper.getUserInfo().token
          }
        };

        let data = {};
        if (!validator.isEmpty(this.user_edit_info.givenName)) {
          data.givenName = this.user_edit_info.givenName;
        }

        if (!validator.isEmpty(this.user_edit_info.familyName)) {
          data.familyName = this.user_edit_info.familyName;
        }

        axios.patch('/users/' + this.user_id, data, axiosConfig)
          .then((response) => {
            console.log(response)
            if (editUserInfoResponseHelper.isValid(response)) {
              this.user_edit_info_status = "";
              this.getUserInfo();
            } else {
              this.user_edit_info_status = editUserInfoResponseHelper.getErrorInfo(response).toString();
            }

          })
          .catch((error) => {
            this.user_edit_info_status = 'Edit user information failed, please try again !' .toString();
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

  #div_user_photo{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  #layout_edit_user_info{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  .img-thumbnail {
    height: 100px;
    width: 100px;
  }
</style>

