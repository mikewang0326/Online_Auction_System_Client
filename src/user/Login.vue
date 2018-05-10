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
                <input ref="txtEmail" type="text" class="form-control" id="email"
                       placeholder="Username or email" autofocus required>
              </div>
              <div class="form-group has-feedback">
                <label for="password" class="control-label sr-only">Add your password.</label>
                <input ref="txtPassword" type="password" class="form-control"
                       id="password" placeholder="Password" >
              </div>
              <div v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</div>
              <div class="checkbox">
                <button class="btn btn-primary pull-right" v-on:click="submitLogin">Sign in</button>
              </div>
            </form>

            <div class="checkbox 2">
              <button class="btn btn-primary pull-left" v-on:click="submitRegister">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginComponent',
    props: {
      errorMessage: {
        type: String,
        required: false,
        default: ''
      },

    },
    data() {
      return {
      }
    },
    mounted: function () {

    },
    methods: {
      checkValidation: function () {
      },

      submitLogin: function () {
        let email = this.$refs.txtEmail.value.trim()
        let password = this.$refs.txtPassword.value.trim()
        alert("username/email is :" + email);
      },

      submitRegister: function () {
        this.$router.push('/user/register');
      }
    }
  }
</script>

<style scoped>
</style>
