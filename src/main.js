import Vue from 'vue'
import App from './App.vue'
import Discover from './Discover'
import Buying from './Buying'
import Selling from './Selling'
import User from './User'
import Users from './Users.vue'

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
  el: '#app',
  router: router,
  render: h => h(App)
})
