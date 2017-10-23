<template>
  <div class="player" :style="bgImg" :class="{fullScreen:fullScreen}" v-show="playList.length>0">
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
        <div class="pro-box">
          <span class="now">{{now | moment}}</span>
          <m-progress class="bar" :percent="percent" @barDrag="barDragHandler" @barDragStart="barDragStartHandler"></m-progress>
          <span class="total">{{duration | moment}}</span>
        </div>
        <div class="operators">
          <i class="icon iconfont" :class="iconMode" @click="changePlayMode"></i>
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
import MProgress from '@/components/base/Progress/Progress'

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
    iconMode () {
      return this.mode === 0 ? 'icon-shunxubofang' : this.mode === 1 ? 'icon-xunhuanbofang' : 'icon-suijibofang'
    },
    ...mapGetters([
      'playing',
      'fullScreen',
      'playList',
      'currentSong',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  filters: {
    moment (val) {
      let m = Math.floor(val / 60) === 0 ? `00` : Math.floor(val / 60)
      let s = val % 60 < 10 ? `0${val % 60}` : val % 60
      return `${m}:${s}`
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      this.$nextTick(() => {
        this.$refs.audio.play()
//        console.log(this.currentSong)
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
    MProgress
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
    barDragStartHandler () {
      this.setPlayingState(false)
    },
    barDragHandler (newPercent) {
      this.percent = newPercent
      this.now = Math.floor(this.percent / 100 * this.duration)
      this.$refs.audio.currentTime = this.now
    },
    loopSong () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      this.songReady = false
      let index = this.currentIndex
      if (index >= this.playList.length) {
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
        index = this.playList.length - 1
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
      if (this.mode === 1) {
        this.loopSong()
      } else {
        this.nextSong()
      }
    },
    changePlayMode () {
      this.setPlayMode((this.mode + 1) % 3)
      let playList = this.sequenceList
      console.log(this.playList)
      console.log(this.sequenceList)
      if (this.mode === 0) {
        this.$vux.toast.text('顺序播放')
      } else if (this.mode === 0) {
        this.$vux.toast.text('循环播放')
      } else {
        this.$vux.toast.text('随机播放')
        playList = this.shuffle(playList)
      }
      this.resetCurrentIndex(playList)
      this.setPlayList(playList)
    },
    resetCurrentIndex (playList) {
      let index = playList.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    shuffle (arr) {
      let _arr = arr.slice()
      let len = _arr.length
      for (let i = 0; i < len - 1; i++) {
        let idx = Math.floor(Math.random() * (len - i))
        let temp = _arr[idx]
        _arr[idx] = _arr[len - i - 1]
        _arr[len - i - 1] = temp
      }
      return _arr
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST'
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
    .pro-box {
      padding: 0 30/@r;
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 140/@r;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .now, .total {
        color: #e6b50d;
      }
      .bar {
        flex: 1;
        margin: 0 12/@r;
        overflow: visible;
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
