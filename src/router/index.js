import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import HomePage from '@/components/HomePage'
import Login from '@/components/Login'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: Login
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;