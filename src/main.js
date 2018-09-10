// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'firebase/auth';
import { FirebaseAuth } from '@/library/Database';

import VeeValidate from 'vee-validate';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

import 'bulma/css/bulma.css';

import FontAwesome from '@fortawesome/fontawesome';
import VueFontAwesome from '@fortawesome/vue-fontawesome';
import FontAwesomeSolid from '@fortawesome/fontawesome-free-solid';

FontAwesome.library.add(FontAwesomeSolid);
Vue.component('fa-icon', VueFontAwesome);
Vue.use(VeeValidate);
Vue.use(VueMoment, {
  moment,
})

Vue.config.productionTip = false;

let baseApp;

FirebaseAuth.onAuthStateChanged(() => {
  /* eslint-disable no-new */
  if (!baseApp) {
    baseApp = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
    });
  }
});
