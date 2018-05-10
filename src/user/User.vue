<template>
  <div>
    <h1>User Page</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        error:"",
        errorFlag: false,
        isLogin: false,
        users:[]
      }
    },

    mounted: function () {
      this.init()
    },

    methods: {
      init: function () {
        if (!this.isLogin) {
          this.$router.push('/user/login');
        }
      },

    }

  }
</script>
