import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/home/index';
import Room from '@/chatRoom/index';
import {authRouter} from "./authRouter";

Vue.use(Router);

// todo  这里可以加个路由控制权限  现在暂时是加再room页面的
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: authRouter(Home)
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }

  ]
});
