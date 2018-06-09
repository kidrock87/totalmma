import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Tags from '@/components/Tags'
import News from '@/components/News'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Admin_create_news from '@/components/Admin_create_news'
import Admin_edit_news from '@/components/Admin_edit_news'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/create_news',
      name: 'admin_create_news',
      component: Admin_create_news
    },
    {
      path: '/admin/edit/:id',
      name: 'Admin_edit_news',
      component: Admin_edit_news
    },
    {
      path: '/news/:id',
      name: 'News',
      component: News
    },
    {
      path: '/tags/:tag_name',
      name: 'Tags',
      component: Tags
    }
  ]
})
