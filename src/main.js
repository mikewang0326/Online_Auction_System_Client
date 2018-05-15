import Vue from 'vue'
import App from './App.vue'
import Discover from './page/discover/Discover'
import AuctionDetail from './page/discover/AuctionDetail'
import CreateAuction from './page/discover/CreateAuction'
import Buying from './page/buying/Buying'
import Selling from './page/selling/Selling'
import User from './page/user/User'
import Login from './page/user/Login'
import Register from './page/user/Register'

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
    path: "/auction_detail",
    name:"auction_detail",
    component: AuctionDetail
  },
  {
    path: "/create_auction",
    name:"create_auction",
    component: CreateAuction
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
