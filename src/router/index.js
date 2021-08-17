import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite'
import Order from '@/pages/Order/Order'
import Search from '@/pages/Search/Search'
import Profile from '@/pages/Profile/Profile'
import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop'
import Goods from '@/pages/Shop/Goods/Goods'
import Info from '@/pages/Shop/Info/Info'
import Ratings from '@/pages/Shop/Ratings/Ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'Msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: '/shop/ratings',
          name: 'Ratings',
          component: Ratings
        },
        {
          path: '/shop/info',
          name: 'Info',
          component: Info
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
