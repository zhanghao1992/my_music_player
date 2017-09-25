<template>
  <div class="player" :class="{fullScreen:fullScreen}" v-show="palyList.length>0">
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
        <div class="content">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="operators">
          <i class="icon iconfont icon-shunxubofang" @click=""></i>
          <i class="icon iconfont icon-bofangqishangyiqu" @click=""></i>

          <i class="icon iconfont icon-bofangqibofang" v-show="playing" @click=""></i>
          <i class="icon iconfont icon-tingzhi" v-show="!playing" @click=""></i>

          <i class="icon iconfont icon-bofangqishangyiqu1" @click=""></i>

          <!--<i class="icon iconfont icon-kongxin" @click=""></i>-->
          <i class="icon iconfont icon-xinxingshi" @click=""></i>
        </div>
      </div>
    </transition>
    <transition name="mini-player" v-show="!fullScreen">
      <div class="mini-player" v-show="!fullScreen" @click="showFullScreen">
        <img :src="currentSong.image" alt="">
        <div class="info">
          <h1 class="name" v-html="currentSong.name"></h1>
          <p class="singer" v-html="currentSong.singer"></p>
        </div>
        <div class="operators">
          <i class="icon iconfont icon-bofangqibofang" v-show="playing"></i>
          <i class="icon iconfont icon-tingzhi" v-show="!playing" @click=""></i>
          <i class="icon iconfont icon-bofangliebiao"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['playing', 'fullScreen', 'palyList', 'currentSong', 'currentIndex'])
  },
  methods: {
    hideNormalPlayer () {
      this.setFullScreen(false)
    },
    showFullScreen () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
        filter: blur(30px);
      }
    }
    .top {
      text-align: center;
      .name {
        font-size: 30/@r;
        line-height: 70/@r;
      }
      .singer {
        font-size: 22/@r;
      }
    }
    .content {
      width: 480/@r;
      height: 480/@r;
      border: 15/@r solid #aaa;
      margin: 180/@r auto 0;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        background: -webkit-gradient(linear, 0 0, 100% 100%, from(rgba(0, 0, 0, .5)), color-stop(0.8, rgba(255, 249, 255, .2)), to(rgba(255, 255, 255, .7)));
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
      }
    }
    .operators {
      position: absolute;
      left: 0;
      bottom: 80/@r;
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

</style>
