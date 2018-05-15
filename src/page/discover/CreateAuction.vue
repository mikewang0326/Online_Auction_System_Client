<template>
  <div>
    <h1>Create Auction Page</h1>
    <div class="container">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Register</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="createAuction">
              <!-- username -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Username</label>
                <input v-model="auction_info.username" type="text" class="form-control" id="username"
                       placeholder="username" autofocus required>
              </div>
              <!-- givenName -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Given Name</label>
                <input v-model="auction_info.givenName" type="text" class="form-control" id="given_name"
                       placeholder="given name" autofocus required>
              </div>
              <!-- familyName -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Family Name</label>
                <input v-model="auction_info.familyName" type="text" class="form-control" id="family_name"
                       placeholder="family name" autofocus required>
              </div>
              <!-- email -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Email</label>
                <input v-model="auction_info.email" type="email" class="form-control"
                       id="email" placeholder="email" required>
              </div>
              <!-- password -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Password</label>
                <input v-model="auction_info.password" type="password" class="form-control"
                       id="password" placeholder="Password" required>
              </div>
              <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>
              <div class="checkbox" >
                <button class="btn btn-primary pull-right">Register</button>
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
  const responseHelper = require('../../data/user/RegisterResponseHelper');

  export default {
    name: 'CreateAuctionComponent',
    data() {
      return {
        status_message:{
          content: ''
        },
        auction_info: {
          username: "",
          givenName: "",
          familyName: "",
          email: "",
          password: ""
        }
      }
    },
    mounted: function () {

    },
    methods: {
      createAuction: function () {
        console.log(this.auction_info);
        this.status_message.content = "Now creating, please wait".toString();
        axios.post('/users', {
          'username': this.auction_info.username,
          'givenName': this.auction_info.givenName,
          'familyName': this.auction_info.familyName,
          'email': this.auction_info.email,
          'password': this.auction_info.password,

        })
          .then((response) => {
            console.log(response);
            if (responseHelper.isRegisterSucceed(response)) {
              this.status_message.content = "Create succeed, back to login page".toString();
              setTimeout(() => {
                this.$router.push('/user/login');
              },3000)
            } else {
              this.status_message.content = responseHelper.getErrorInfo(response);
            }
          })
          .catch((error) => {
            this.status_message.content = error.toString();
          });
      }
    }
  }
</script>

<style scoped>
</style>
