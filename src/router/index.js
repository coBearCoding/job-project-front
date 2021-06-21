import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/film-crew',
    name: 'FilmCrew',
    component: () => import('../views/FilmCrew/Data.vue'),
    meta:{routeProtected: true }
  },
  {
    path: '/movies',
    name: 'Home',
    component: () => import('../views/Movie/Data.vue'),
    meta:{routeProtected: true }
  },
  {
    path: '/actors',
    name: 'Home',
    component: () => import('../views/Actor/Data.vue'),
    meta:{routeProtected: true }
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next)=>{
  const routeIsProtected = to.matched.some(item => item.meta.routeProtected);

  if (routeIsProtected && store.state.token === null){
    next({name: 'Index'});
  }else{
    next();
  }
});

export default router
