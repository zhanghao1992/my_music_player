<template>
  <div id="app">
    <m-header></m-header>

    <tab></tab>


    <!--<el-carousel class="slider" :interval="5000" arrow="always">-->
      <!--<el-carousel-item class="slider-item" v-for="(slider, index) in sliderList" :key="index">-->
        <!--<a :href="slider.linkUrl">-->
          <!--<img :src="slider.picUrl" alt="">-->
        <!--</a>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->

    <el-carousel class="slider" trigger="click" height="150px">
      <el-carousel-item class="slider-item" v-for="(slider, index) in sliderList" :key="index">
        <a :href="slider.linkUrl">
          <img :src="slider.picUrl" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>

    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import Tab from '@/components/Tab/Tab'

export default {
  name: 'app',
  data () {
    return {
      activeName: 'second',
      sliderList: []
    }
  },
  components: {
    MHeader,
    Tab
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
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less">
@r: 20rem;
body {
  background: #324057;
  color: #fff;

  .slider {
    height: 250/@r;
    .slider-item {
      height: 250/@r;
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
    .el-carousel__button {
      width: 40/@r;
    }
  }
}

</style>
