import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend/Recommend'
import Disc from '@/components/Disc/Disc'
import Singer from '@/components/Singer/Singer'
import SingerDeatil from '@/components/singer-deatil/singer-deatil'
import Rank from '@/components/Rank/Rank'
import Search from '@/components/Search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDeatil
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
