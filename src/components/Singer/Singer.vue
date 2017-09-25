<template>
  <div>
    <div class="singer" ref="singerWrapper" :data="singers">
      <list-view :data="singers" @to-detail="toDetail"></list-view>
      <loading :show="!singers.length"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ListView from '@/components/base/ListView/ListView'
import Singer from '@/common/js/singer'
import { Loading } from 'vux'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    setTimeout(() => {
      this._getSingersList()
    }, 2000)
  },
  components: {
    ListView,
    Loading
  },
  methods: {
    _getSingersList () {
      this.$jsonp('/qq_music_api/v8/fcg-bin/v8.fcg', {
        channel: 'singer',
        page: 'list',
        callbackQuery: 'jsonpCallback',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        platform: 'yqq',
        notice: 0,
        needNewCode: 0
      }).then(jsonp => {
        if (jsonp.code === 0) {
          this.singers = this._normalizeSinger(jsonp.data.list)
        }
//        console.log(this._normalizeSinger(jsonp.data.list))
      }).catch(err => {
        console.log(err)
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: '热门数据',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      let hot = []
      let res = []
      for (let key in map) {
        let val = map[key]
        if (val.title && val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title === '热门数据') {
          hot.push(val)
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res)
    },
    toDetail (singer) {
      this.$router.push({path: `/singer/${singer.id}`})
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.singer {
  position: absolute;
  top: 170/@r;
  bottom: 0;
  width: 32rem;
  overflow: hidden;
}
</style>
