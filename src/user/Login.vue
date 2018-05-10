<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Login</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="submitLogin" novalidate>
              <div class="form-group has-feedback">
                <label for="email" class="control-label sr-only">Add your email address.</label>
                <input v-model="login_info.username_or_email" type="text" class="form-control" id="email"
                       placeholder="Username or email" autofocus required>
              </div>
              <div class="form-group has-feedback">
                <label for="password" class="control-label sr-only">Add your password.</label>
                <input v-model="login_info.password" type="password" class="form-control"
                       id="password" placeholder="Password" >
              </div>
              <div v-if="errorMessage.response" class="text-center text-danger">{{ errorMessage.response }}</div>
              <div class="checkbox" >
                <button class="btn btn-primary pull-right">Sign in</button>
              </div>
            </form>

            <div class="checkbox">
              <button class="btn btn-primary pull-left" v-on:click="submitRegister">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from '../axios'
  const userHelper = require('./UserHelper')

  export default {
    name: 'LoginComponent',
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
        errorMessage:{
          response: 'Login failed'
        },
        login_info: {
          username_or_email: 'hixin1@example.com',
          password: '123321'
        }
      }
    },
    mounted: function () {

    },
    methods: {
      checkValidation: function () {
      },

      submitLogin: function () {

        axios.post('/users/login', {
          'email': this.login_info.username_or_email,
          'password': this.login_info.password
        })
          .then((response) => {
            console.log(response['data']['id']);
            console.log(response['data']['token']);
            // if login succeed, save token, and return to user page
            userHelper.saveLoginStatus(response['data']['id'], response['data']['token']);
            console.log('user login status is : ' + userHelper.isLogin());
            if (userHelper.isLogin()) {
              this.$router.push('/user');
              console.log('has push to user page');
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      submitRegister: function () {
        this.$router.push('/user/register');
      }
    }
  }
</script>

<style scoped>
</style>
