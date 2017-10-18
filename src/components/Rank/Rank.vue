<template>
  <div>
    <scroll class="rank" :data="rankList">
      <ul class="rank-list">
        <li class="rakn-list-item" v-for="(item,index) in rankList" @click="toDetail(item)" :key="index">
          <div class="left">
            <img class="img" :src="item.picUrl" alt="">
            <!--{{item.topTitle | formatTitle}}-->
            <span class="listen">
              <i class="icon iconfont icon-ermai"></i>
              {{item.listenCount | formatNumber}}
            </span>
          </div>
          <div class="right">
            <h1 class="title">{{item.topTitle}}</h1>
            <ul class="miniList">
              <li v-for="(miniItem,miniIndex) in item.songList" :key="miniIndex">
                <span class="index">{{miniIndex + 1}}</span>
                <span class="song-name">{{miniItem.songname}}</span>
                <span class="singer-name">{{miniItem.singername}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
    <loading :show="!rankList.length"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/components/base/scroll/scroll'
import { Loading } from 'vux'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      rankList: []
    }
  },
  created () {
    this._getRankList()
  },
  mounted () {
//    this.$vux.toast.text(err, 'middle')
  },
  components: {
    Scroll,
    Loading
  },
  filters: {
    formatNumber (num) {
      return `${(num / 10000).toFixed(1)}万`
    },
    formatTitle (val) {
      let arr = val.split('巅峰榜')
      return arr[arr.length - 1].substr(1)
    }
  },
  methods: {
    toDetail (item) {
      this.$router.push(`/rank/${item.id}`)
      this.setRank(item)
    },
    _getRankList () {
      this.$jsonp('/qq_music_api/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        callbackQuery: 'jsonpCallback',
        g_tk: 974063726,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 0
      }).then(jsonp => {
        if (jsonp.code === 0) {
          this.rankList = jsonp.data.topList
        }
      }).catch(err => {
        this.$vux.toast.text(err, 'middle')
      })
    },
    ...mapMutations({
      setRank: 'SET_RANK'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.rank {
  position: absolute;
  top: 170/@r;
  bottom: 0;
  width: 32rem;
  overflow: hidden;
  .rank-list {
    .rakn-list-item {
      padding: 20/@r 40/@r;
      display: flex;
      .left {
        position: relative;
        color: rgba(255, 255, 255, .8);
        font-size: 20/@r;
        line-height: 36/@r;
        margin-right: 20/@r;
        .img {
          width: 140/@r;
          height: 140/@r;
          vertical-align: top;
        }
        .listen {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          text-indent: 8/@r;
          vertical-align: middle;
          .icon-ermai {
            font-size: 16/@r;
          }
        }
      }
      .right {
        flex: 1;
        font-size: 0;
        color: rgba(255, 255, 255, .9);
        .title {
          font-size: 26/@r;
          line-height: 36/@r;
          height: 36/@r;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .miniList {
          font-size: 20/@r;
          li {
            width: 100%;
            margin-top: 10/@r;
          }
        }
      }
    }
  }
}
</style>
