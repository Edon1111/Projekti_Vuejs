// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an
//alias.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@mdi/font/css/materialdesignicons.css";
// index.js or main.js

import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueSwal from "vue-swal";
import App from "./App";
import router from "./router";
import { store } from "./store/store";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwE1_Jql1M9sQnQg09JUR1u_FqukZc2P8",
  authDomain: "projekti-vuejs.firebaseapp.com",
  projectId: "projekti-vuejs",
  storageBucket: "projekti-vuejs.appspot.com",
  messagingSenderId: "1054813999035",
  appId: "1:1054813999035:web:068ba64a35207c7352be9e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueSwal);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
