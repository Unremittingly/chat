import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/index'
import Room from '@/chatRoom/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }
  ]
})
