import Vue from 'vue'
import Router from 'vue-router'
import completed from '@/views/completed'
import important from '@/views/important'
import edit from '@/views/edit'
import home from '@/views/home'
import register from '@/views/register'
import login from '@/views/login'
Vue.use(Router)

export default new Router({
 
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/completed',
      name: 'completed',
      component: completed
    },
    {
      path: '/important',
      name: 'important',
      component: important
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: edit
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
},
  ]
})
