import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/components/views/Home'
import Inquiry from '@/components/views/Inquiry'
import Login from '@/components/views/Login'
import DrivePicker from '@/components/elements/DrivePicker'
import Setting from '@/components/views/Setting'
import EditRegion from '@/components/views/EditRegion'
import MakeRequest from '@/components/views/MakeRequest'

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
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/drive-picker',
      name: 'DrivePicker',
      component: DrivePicker,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-region/:id',
      name: 'EditRegion',
      component: EditRegion,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/make-request/:id',
      name: 'Make Request',
      component: MakeRequest,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode:  'history',
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;