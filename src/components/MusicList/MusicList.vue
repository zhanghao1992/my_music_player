<template>
  <div class="MusicList">
    <div class="title" :style="backgroundImage" ref="title">
      <h1 v-html="title"></h1>
      <router-link :to="{path:'/singer'}">
        <i class="icon iconfont icon-fanhui"></i>
      </router-link>
      <div class="playAll" v-show="showflag">
        <i class="icon iconfont icon-bofangqibofang"></i>
        随机播放全部
      </div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll ref="songsWrapper" class="scroller" :probe-type="3" :data="songsList" @on-scroll="onScroll">
      <div class="songsWrapper">
        <song-list :songs-list="songsList"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import SongList from '@/components/base/SongList/SongList'
import Scroll from '@/components/base/scroll/scroll'

export default {
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songsList: {
      type: Array,
      defaulta: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollY: 0,
      maxY: 0,
      showflag: true
    }
  },
  computed: {
    backgroundImage () {
      return `background-image:url(${this.bgImg})`
    }
  },
  mounted () {
    this.maxY = -this.$refs.title.getBoundingClientRect().height + 40
  },
  components: {
    SongList,
    Scroll
  },
  methods: {
    onScroll (pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY (newY) {
      let tY = Math.max(this.maxY, newY)
      let zindex = 1
      this.$refs.bgLayer.style['transform'] = `translate3d(0,${tY}px,0)`
      this.$refs.bgLayer.style['webkitTransform'] = `translate3d(0,${tY}px,0)`
      if (newY < this.maxY) {
        zindex = 10
        this.$refs.title.style['height'] = `40px`
        this.showflag = false
      } else {
        this.$refs.title.style['height'] = `22rem`
        this.showflag = true
      }
      this.$refs.title.style['zIndex'] = `${zindex}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.MusicList {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgb(7, 17, 27);
  z-index: 100;
  .title {
    background-repeat: no-repeat;
    background-size: 100% auto;
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 440/@r;
    height: 440/@r;;
    h1 {
      font-size: 24/@r;
      padding: 20/@r 60/@r 0;
      font-weight: 300;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon-fanhui {
      position: absolute;
      left: 20/@r;
      top: 20/@r;
      width: 40/@r;
      text-align: center;
      line-height: 40/@r;
      font-size: 38/@r;
      color: #e6b50d;
      font-weight: 300;
    }
    .playAll {
      position: absolute;
      left: 220/@r;
      bottom: 20/@r;
      height: 40/@r;
      line-height: 40/@r;
      padding: 4/@r 30/@r;
      border-radius: 24/@r;
      border: 2px solid #bcc21a;
      color: #bcc21a;
    }
  }
  .bg-layer {
    background: rgb(7, 17, 27);
    position: absolute;
    width: 100%;
    top: 440/@r;
    height: 100%;
    z-index: 2;
  }
  .scroller {
    position: absolute;
    width: 100%;
    top: 440/@r;
    bottom: 0;
    z-index: 3;
  }
}
</style>
