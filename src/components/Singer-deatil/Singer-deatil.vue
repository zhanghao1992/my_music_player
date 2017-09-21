<template>
  <transition name="slide">
    <music-list :title="title" :songs-list="songsList" :bg-img="bgImg"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/MusicList/MusicList'

export default {
  name: '',
  data () {
    return {
      songsList: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImg () {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  components: {
    MusicList
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
        if (jsonp.code === 0) {
          this.songsList = this._normallizeSongs(jsonp.data.list)
        }
        console.log(this._normallizeSongs(jsonp.data.list))
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
