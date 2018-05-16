<template>
  <div id="app">
    <ul class="nav nav-pills">
      <li role="presentation" :class="discoverClassName"><router-link to="/discover">Discover</router-link></li>
      <li role="presentation" :class="buyingClassName"><router-link to="/buying">Buying</router-link></li>
      <li role="presentation" :class="sellingClassName"><router-link to="/selling">Selling</router-link></li>
      <li role="presentation" :class="userClassName"><router-link to="/user">User</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    discoverClassName: function () {
      console.log('discoverClassName path' + this.$route.path)
      if ('/discover' == this.$route.path || '/' == this.$route.path) {
        return 'active';
      } else {
        return '';
      }
    },
    buyingClassName:function () {
      console.log('buyClassName path' + this.$route.path)
      if ('/buying' == this.$route.path) {
        return 'active';
      } else {
        return '';
      }
    },
    sellingClassName:function () {
      console.log('sellingClassName path' + this.$route.path)
      if ('/selling' == this.$route.path) {
        return 'active';
      } else {
        return '';
      }
    },
    userClassName:function () {
      console.log('userClassName path' + this.$route.path)
      if ('/user' == this.$route.path || this.$route.path.indexOf('/user') > -1) {
        return 'active';
      } else {
        return '';
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
