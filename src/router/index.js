import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller/Seller'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'goods' }
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
})
