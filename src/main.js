import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'

import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyATsu60pi7JRc4cLNShQ4BRGy4FQhey6LI',
  authDomain: 'vue-crm-ild.firebaseapp.com',
  projectId: 'vue-crm-ild',
  storageBucket: 'vue-crm-ild.appspot.com',
  messagingSenderId: '70544327385',
  appId: '1:70544327385:web:228773f500091f4ec234c8'
}
firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) app = createApp(App).use(store).use(router).use(messagePlugin).mount('#app')
})
