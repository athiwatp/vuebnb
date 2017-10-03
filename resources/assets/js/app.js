import "core-js/fn/object/assign";
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from '../components/App.vue';
import Home from '../components/Home.vue';
import Listing from '../components/Listing.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/listing/:listing', component: Listing, name: 'listing' }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

var app = new Vue({
  el: '#app',
  render: h => h(App),
  router
});
