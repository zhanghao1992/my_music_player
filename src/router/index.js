import Vue from 'vue'
import Router from 'vue-router'
import Recomend from '@/components/Recomend/Recomend'
import Singer from '@/components/Singer/Singer'
import Rank from '@/components/Rank/Rank'
import Search from '@/components/Search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recomend'
    },
    {
      path: '/recomend',
      component: Recomend
    },
    {
      path: '/singer',
      component: Singer
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
