<template>
  <div>
    <scroll class="recommend" ref="recommendScroll" :data="discList">
      <div>
        <swiper class="slider" loop auto height="150px" :interval="4000">
          <swiper-item v-for="(slider, index) in sliderList" :key="index">
            <a :href="slider.linkUrl">
              <img @loaded="imgLoaded" v-lazy="slider.picUrl" alt="">
            </a>
          </swiper-item>
        </swiper>

        <div class="recommend-list">
          <h1 class="recommend-list-title">热门推荐</h1>
          <ul>
            <li class="recommend-list-item" v-for="(item, index) in discList" @click="toDetail(item)">
              <img class="img" v-lazy="item.imgurl" alt="">
              <div class="right">
                <h4 class="creator" v-html="item.creator.name"></h4>
                <p class="dissname" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading :show="!discList.length"></loading>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/components/base/scroll/scroll'
import { Swiper, SwiperItem, Loading } from 'vux'
import { mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  name: '',
  data () {
    return {
      sliderList: [],
      discList: [],
      activeIndex: 0,
      imgloaded: false
    }
  },
  components: {
    Swiper,
    SwiperItem,
    Scroll,
    Loading
  },
  created () {
    console.log(_.assign({'user': 'barney'}, {'age': 40}, {'user': 'fred'}))
    this._getSliserList()
    this._getDiscList()
  },
  methods: {
    toDetail (item) {
      console.log(item)
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    // 获取轮播图列表
    _getSliserList () {
      this.$http.get('/qq_music_api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
        g_tk: '314330031',
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: '0',
        platform: 'h5',
        needNewCode: 1
      }).then(json => {
        if (json.data.code === 0) {
          this.sliderList = json.data.data.slider
        }
//        console.log(json)
      }).catch(err => {
        this.$vux.toast.text(err, 'middle')
      })
    },
    // 获取推荐列表
    _getDiscList () {
      this.$jsonp('/qq_music_api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
        rnd: 0.9337848460479694,
        g_tk: 514819232,
        callbackQuery: 'jsonpCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        platform: 'yqq',
        notice: 0,
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29
      }).then(jsonp => {
        if (jsonp.code === 0) {
          this.discList = jsonp.data.list
        }
//        console.log(this.discList)
      }).catch(err => {
        this.$vux.toast.text(err, 'middle')
      })
    },
    // 图片记载完毕刷新滚动组件
    imgLoaded () {
      if (!this.imgloaded) {
        this.$refs.recommendScroll.refresh()
        this.imgloaded = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@r: 20rem;
.recommend {
  position: absolute;
  top: 170/@r;
  bottom: 0;
  width: 32rem;
  overflow: hidden;
  .slider {
    a {
      display: block;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .recommend-list {
    .recommend-list-title {
      font-size: 24/@r;
      line-height: 70/@r;
      text-align: center;
      color: #f2df09;
    }
    .recommend-list-item {
      display: flex;
      padding: 20/@r 40/@r;
      .img {
        width: 140/@r;
        height: 140/@r;
        margin-right: 20/@r;
      }
      .right {
        .creator {
          font-size: 22/@r;
          line-height: 30/@r;
        }
        .dissname {
          color: #eee;
          margin-top: 20/@r;
          line-height: 30/@r;
        }
      }
    }
  }
}

</style>
