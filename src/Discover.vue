<template>
  <div id="discover">
    <h1>Discover Page</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        error:"",
        errorFlag: false,
        users:[]
      }
    },

    mounted: function () {
      // this.getUsers()
    },

    methods: {
      getUsers: function () {
        this.$http.get("http://localhost:4941/api/v1/users")
          .then(function (response) {
            console.log("get response")
            this.users = response.data;
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          })
      },

    }

  }
</script>
