import Vue from 'vue'
import Homepage from './Homepage.vue'
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
    path: "/users/:userId",
    name: "user",
    component: Users
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
