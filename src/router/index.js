import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Demo = (resolve) => {
  import('@/components/Demo/Demo').then((module) => {
    resolve(module)
  })
}

const Recommend = (resolve) => {
  import('@/components/Recommend/Recommend').then((module) => {
    resolve(module)
  })
}

const Disc = (resolve) => {
  import('@/components/Disc/Disc').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('@/components/Singer/Singer').then((module) => {
    resolve(module)
  })
}

const SingerDeatil = (resolve) => {
  import('@/components/Singer/Singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('@/components/Rank/Rank').then((module) => {
    resolve(module)
  })
}

const RankDetail = (resolve) => {
  import('@/components/Rank-detail/Rank-detail').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('@/components/Search/Search').then((module) => {
    resolve(module)
  })
}

const NotFoundComponent = (resolve) => {
  import('@/components/NotFoundComponent/NotFoundComponent').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {path: '*', component: NotFoundComponent},
    {
      path: '/demo',
      component: Demo
    },
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
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
