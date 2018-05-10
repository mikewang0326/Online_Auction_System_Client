import Vue from 'vue'
import App from './App.vue'
import Discover from './Discover'
import Auction from './Auction'
import Buying from './Buying'
import Selling from './Selling'
import User from './user/User'
import Login from './user/Login'
import Register from './user/Register'

import VueRouter from 'vue-router';
import VueResource from 'vue-resource'

Vue.use(VueRouter);

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/",
    component: Discover
  },
  {
    path: "/discover",
    name: "discover",
    component: Discover
  },
  {
    path: "/auction",
    name:"auction",
    component: Auction
  },
  {
    path: "/buying",
    name: "buying",
    component: Buying
  },
  {
    path: "/selling",
    name: "selling",
    component: Selling
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/user/login",
    name: "login",
    component: Login
  },
  {
    path: "/user/register",
    name:"register",
    component: Register
  },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
