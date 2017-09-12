<template>
  <div class="">
    <!--<el-carousel class="slider" trigger="click" height="150px">-->
    <!--<el-carousel-item class="slider-item" v-for="(slider, index) in sliderList" :key="index">-->
    <!--<a :href="slider.linkUrl">-->
    <!--<img :src="slider.picUrl" alt="">-->
    <!--</a>-->
    <!--</el-carousel-item>-->
    <!--</el-carousel>-->

    <swiper class="slider" loop auto height="150px" :interval="4000">
      <swiper-item v-for="(slider, index) in sliderList" :key="index">
        <a :href="slider.linkUrl">
          <img :src="slider.picUrl" alt="">
        </a>
      </swiper-item>
    </swiper>

  </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperItem } from 'vux'

export default {
  name: '',
  data () {
    return {
      sliderList: [],
      baselist: [{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/5.jpg',
        title: '送你一次旅行',
        fallbackImg: 'https://static.vux.li/demo/3.jpg'
      }],
      activeIndex: 0
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created () {
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
      console.log(this.sliderList)
    }).catch(err => {
      console.log(err)
    })
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
