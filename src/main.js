import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import Auth from "./plugins/Auth";

Vue.use(firestorePlugin)

firebase.initializeApp({
  projectId: process.env.VUE_APP_PROJECT_ID,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  apiKey: process.env.VUE_APP_API_KEY
})

Vue.config.performance = true

Vue.use(CoreuiVue)

Vue.prototype.$log = console.log.bind(console)

Vue.use(Auth);

require('./config/guards');

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})

export const db = firebase.firestore()

