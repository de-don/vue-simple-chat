import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import ChatRoom from '../components/ChatRoom';
import store from '../store';

import { FirebaseAuth } from '../library/Database';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/chat',
      component: ChatRoom
    },
    {
      path: '/logout',
      beforeEnter(to, _from, next) {
        FirebaseAuth.signOut().then(() => {
          store.commit('LOGOUT');
          next({
            path: '/login',
          });
        });
      }
    },
  ]
});

router.beforeEach((to, _from, next) => {
  let auth = FirebaseAuth;

  if (auth.currentUser === null && to.path !== '/') {
    next({
      path: '/',
    });
  } else if (auth.currentUser !== null && to.path === '/') {
    next({
      path: '/chat'
    });
  } else {
    next();
  }
});

export default router;
