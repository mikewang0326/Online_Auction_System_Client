<template>
  <div id="app">
    <router-view></router-view>
    <ul>
      <li><router-link to="/discover">Discover</router-link></li>
      <li><router-link to="/buying">Buying</router-link></li>
      <li><router-link to="/Selling">Selling</router-link></li>
      <li><router-link to="/user">User</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
