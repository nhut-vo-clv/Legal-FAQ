import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import HomePage from '@/components/HomePage'
import Inquiry from '@/components/Inquiry'
import Login from '@/components/Login'
import DrivePicker from '@/components/DrivePicker'
import Setting from '@/components/Setting'

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
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    },
    {
<<<<<<< HEAD
      path: '/drive-picker',
      name: 'DrivePicker',
      component: DrivePicker,
=======
      path: '/inquiry',
      name: 'Inquiry',
      component: Inquiry,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
>>>>>>> 4a2940794dbd2de79e0ebd874a14f2752061e5be
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