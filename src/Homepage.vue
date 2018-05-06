<template>
  <div id="homepage">
    <router-view></router-view>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Ecosystem</h2>
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
  name: 'homepage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Homepage'
    }
  }
}
</script>

<style>
#homepage {
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
