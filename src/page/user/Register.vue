<template>
  <div>
    <div class="container">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Register</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="submitRegister">
              <!-- username -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Username</label>
                <input v-model="register_info.username" type="text" class="form-control" id="username"
                       placeholder="username" autofocus required>
              </div>
              <!-- givenName -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Given Name</label>
                <input v-model="register_info.givenName" type="text" class="form-control" id="given_name"
                       placeholder="given name" autofocus required>
              </div>
              <!-- familyName -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Family Name</label>
                <input v-model="register_info.familyName" type="text" class="form-control" id="family_name"
                       placeholder="family name" autofocus required>
              </div>
              <!-- email -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Email</label>
                <input v-model="register_info.email" type="email" class="form-control"
                       id="email" placeholder="email" required>
              </div>
              <!-- password -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Password</label>
                <input v-model="register_info.password" type="password" class="form-control"
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
    name: 'RegisterComponent',
    data() {
      return {
        status_message:{
          content: ''
        },
        register_info: {
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
      submitRegister: function () {
        console.log(this.register_info);
        this.status_message.content = "Now registering, please wait".toString();
        axios.post('/users', {
          'username': this.register_info.username,
          'givenName': this.register_info.givenName,
          'familyName': this.register_info.familyName,
          'email': this.register_info.email,
          'password': this.register_info.password,

        })
          .then((response) => {
            console.log(response);
            if (responseHelper.isRegisterSucceed(response)) {
              this.status_message.content = "Register succeed, back to login page".toString();
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
