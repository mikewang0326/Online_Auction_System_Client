import Vue from 'vue'
import Homepage from './Homepage.vue'
import Discover from './Discover'
import Buying from './Buying'
import Selling from './Selling'
import User from './User'
import Home from './Home.vue'
import Users from './Users.vue'

import VueRouter from 'vue-router';
import VueResource from 'vue-resource'

Vue.use(VueRouter);

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/discover",
    name: "discover",
    component: Discover
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
    path: "/users",
    name:"users",
    component: Users
  },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#homepage',
  router: router,
  render: h => h(Homepage)
})
