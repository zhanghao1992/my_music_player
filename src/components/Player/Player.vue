<template>
  <div class="player" :style="bgImg" :class="{fullScreen:fullScreen}" v-show="palyList.length>0">
    <transition name="normal-player">
      <div class="normal-player" v-show="fullScreen">
        <i class="icon iconfont icon-xiala" @click="hideNormalPlayer"></i>
        <div class="background">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="top">
          <h1 class="name" v-html="currentSong.name"></h1>
          <p class="singer" v-html="currentSong.singer"></p>
        </div>
        <div class="content" ref="spinning" :class="{paused:!playing}">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="progress">
          <span class="now">{{now | moment}}</span>
          <x-progress class="bar" :percent="percent" :show-cancel="false"></x-progress>
          <span class="total">{{duration | moment}}</span>
        </div>
        <div class="operators">
          <i class="icon iconfont icon-shunxubofang" @click=""></i>
          <i class="icon iconfont icon-bofangqishangyiqu" @click="preSong"></i>
          <i class="icon iconfont" :class="playIcon" @click="togglePlay"></i>
          <i class="icon iconfont icon-bofangqishangyiqu1" @click="nextSong"></i>
          <!--<i class="icon iconfont icon-kongxin" @click=""></i>-->
          <i class="icon iconfont icon-xinxingshi" @click=""></i>
        </div>
      </div>
    </transition>
    <transition name="mini-player" v-show="!fullScreen">
      <div class="mini-player" v-show="!fullScreen" @click="showFullScreen">
        <img ref="spinning1" :src="currentSong.image" :class="{paused:!playing}" alt="">
        <div class="info">
          <h1 class="name" v-html="currentSong.name"></h1>
          <p class="singer" v-html="currentSong.singer"></p>
        </div>
        <div class="operators">
          <i class="icon iconfont" v-show="!playing"></i>
          <i class="icon iconfont" :class="playIcon" @click.stop="togglePlay"></i>
          <i class="icon iconfont icon-bofangliebiao"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { XProgress } from 'vux'

export default {
  data () {
    return {
      songReady: false,
      percent: 0,
      now: 0,
      duration: 0
    }
  },
  computed: {
    playIcon () {
      return this.playing ? 'icon-tingzhi' : 'icon-bofangqibofang'
    },
    bgImg () {
      return `background-image:url(${this.currentSong.image})`
    },
    ...mapGetters(['playing', 'fullScreen', 'palyList', 'currentSong', 'currentIndex'])
  },
  filters: {
    moment (val) {
      let m = Math.floor(val / 60) === 0 ? `00` : Math.floor(val / 60)
      let s = val % 60 < 10 ? `0${val % 60}` : val % 60
      return `${m}:${s}`
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
        console.log(this.currentSong)
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  components: {
    XProgress
  },
  methods: {
    hideNormalPlayer () {
      this.setFullScreen(false)
    },
    showFullScreen () {
      this.setFullScreen(true)
    },
    togglePlay () {
      this.setPlayingState(!this.playing)
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      this.songReady = false
      let index = this.currentIndex
      if (index >= this.palyList.length) {
        index = 0
      } else {
        index++
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
    },
    preSong () {
      if (!this.songReady) {
        return
      }
      this.songReady = false
      let index = this.currentIndex
      if (index <= 0) {
        index = this.palyList.length - 1
      } else {
        index--
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
    },
    ready (e) {
      this.songReady = true
      this.duration = Math.floor(e.target.duration)
    },
    error () {
      this.songReady = true
    },
    timeupdate (e) {
      this.now = Math.floor(e.target.currentTime)
      this.percent = (e.target.currentTime / this.duration) * 100
    },
    end () {
      this.nextSong()
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@r: 20rem;
.player {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  .normal-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #324057;
    .icon-xiala {
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
    .background {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
        filter: blur(20px);
      }
    }
    .top {
      text-align: center;
      .name {
        font-size: 30/@r;
        line-height: 70/@r;
        padding: 0 80/@r;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .singer {
        font-size: 22/@r;
      }
    }
    .content {
      width: 440/@r;
      height: 440/@r;
      border: 15/@r solid #aaa;
      margin: 100/@r auto 0;
      border-radius: 50%;
      overflow: hidden;
      animation: spinning 20000ms linear infinite;
      background: -webkit-gradient(linear, 0 0, 100% 100%, from(rgba(0, 0, 0, .5)), color-stop(0.8, rgba(255, 249, 255, .2)), to(rgba(255, 255, 255, .7)));
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
      &.paused {
        animation-play-state: paused;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .progress {
      padding: 0 30/@r;
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 140/@r;
      box-sizing: border-box;
      display: flex;
      .now, .total {
        color: #e6b50d;
      }
      .bar {
        flex: 1;
        margin: 0 10/@r;
        overflow: hidden;
        .weui-progress__inner-bar {
          background-color: #fead00;
        }
      }
    }
    .operators {
      position: absolute;
      left: 0;
      bottom: 50/@r;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 20/@r;
      box-sizing: border-box;
      .icon {
        font-size: 42/@r;
        color: #e6b50d;
        &.icon-bofangqibofang, &.icon-tingzhi {
          font-size: 66/@r;
        }
        &.icon-kongxin {
          color: #ccc;
        }
        &.icon-xinxingshi {
          color: #f60;
        }
      }
    }
  }
  .mini-player {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100/@r;
    width: 100%;
    background: #324057;
    display: flex;
    align-items: center;
    img {
      width: 80/@r;
      height: 80/@r;
      border-radius: 50%;
      margin-left: 40/@r;
      animation: spinning 20000ms linear infinite;
      &.paused {
        animation-play-state: paused;
      }
    }
    .info {
      margin-left: 60/@r;
      .name {
        font-size: 22/@r;
        line-height: 36/@r;
      }
      .singer {
        font-size: 20/@r;
        line-height: 30/@r;
      }
    }
    .operators {
      flex: 1;
      display: flex;
      margin-right: 40/@r;
      justify-content: flex-end;
      .icon {
        font-size: 40/@r;
        color: #e6b50d;
        &.icon-bofangliebiao {
          margin-left: 20/@r;
        }
      }
    }
  }
}
.normal-player-enter-active,
.normal-player-leave-active,
.mini-player-enter-active,
.mini-player-leave-active {
  transition: .6s;
}
.normal-player-enter-to,
.normal-player-leave,
.mini-player-enter-to,
.mini-player-leave {
  transform: translate3d(0, 0, 0)
}
.normal-player-enter,
.normal-player-leave-to,
.mini-player-enter,
.mini-player-leave-to {
  transform: translate3d(0, 100%, 0)
}
@keyframes spinning {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
