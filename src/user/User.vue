<template>
  <div>
    <h1>User Page</h1>
    <h2>{{ user.id }}}</h2>
    <h2>{{ user.name }}}</h2>
    <h2>{{ user.token }}}</h2>

    <div class="checkbox" >
      <button v-on:click="logout"  class="btn btn-primary pull-right">Logout</button>
    </div>
  </div>
</template>

<script>
  const userHelper = require('./UserHelper')
  export default {
    data () {
      return {
        error:"",
        errorFlag: false,
        isLogin: false,
        user:{
          id:'',
          token:''
        }
      }
    },

    mounted: function () {
      this.init()
    },

    methods: {
      init: function () {
        this.isLogin = userHelper.isLogin();
        this.user = userHelper.getUserInfo();
        if (!this.isLogin) {
          this.$router.push('/user/login');
        }
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
