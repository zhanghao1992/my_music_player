<template>
  <transition name="slide">
    <div class="SingerDetail">
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { createSong } from '@/common/js/song'

export default {
  name: '',
  data () {
    return {
      songsList: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
//    console.log(this.singer)
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push({path: '/singer'})
        return
      }
      this.$jsonp('/qq_music_api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
        g_tk: 989808312,
        callbackQuery: 'jsonpCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: this.singer.id,
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1
      }).then(jsonp => {
        console.log(jsonp)
        if (jsonp.code === 0) {
          this.songsList = jsonp.data.list
        }
        console.log(this._normallizeSongs(jsonp.data.list))
//        console.log(this.songsList)
      }).catch(err => {
        console.log(err)
      })
    },
    _normallizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.SingerDetail {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ccc;
  z-index: 100;
}
.slide-enter-active, .slide-leave-active {
  transition: .3s;
}
.slide-enter-to, .slide-leave {
  transform: translate3d(0, 0, 0);
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
