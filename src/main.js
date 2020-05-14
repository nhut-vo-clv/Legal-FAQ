import Vue from 'vue'
import router from './router'
/** Element UI Start */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
import locale from 'element-ui/lib/locale/lang/en'
/** Element UI End */

/** Firebase Start */
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyByVbmX_YAQ45AFONmoVY4zODFwCzPuNYI",
  authDomain: "legalfaq-eb4a8.firebaseapp.com",
  databaseURL: "https://legalfaq-eb4a8.firebaseio.com",
  projectId: "legalfaq-eb4a8",
  storageBucket: "legalfaq-eb4a8.appspot.com",
  messagingSenderId: "674624631228",
  appId: "1:674624631228:web:485b0a8fea65d6f1f47bb9",
  measurementId: "G-S45FKF9LK8"
};
firebase.initializeApp(firebaseConfig)
/** Firebase End */

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

let app = '';
/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }
});
