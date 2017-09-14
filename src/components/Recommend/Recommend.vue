<template>
  <div class="">
    <swiper class="slider" loop auto height="150px" :interval="4000">
      <swiper-item v-for="(slider, index) in sliderList" :key="index">
        <a :href="slider.linkUrl">
          <img :src="slider.picUrl" alt="">
        </a>
      </swiper-item>
    </swiper>

    <div class="recommend-list">
      <h1>热门推荐</h1>
      <ul>
        <li></li>
      </ul>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperItem } from 'vux'
import _ from 'lodash'

export default {
  name: '',
  data () {
    return {
      sliderList: [],
      discList: [],
      activeIndex: 0
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created () {
    console.log(_.assign({'user': 'barney'}, {'age': 40}, {'user': 'fred'}))

    this.$http.get('/qq_music_api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
      g_tk: '314330031',
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: '0',
      platform: 'h5',
      needNewCode: 1
    }).then(json => {
      this.sliderList = json.data.data.slider
//      console.log(this.sliderList)
    }).catch(err => {
      console.log(err)
    })

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
      this.discList = jsonp.data.list
      console.log(this.discList)
    }).catch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@r: 20rem;
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
</style>
