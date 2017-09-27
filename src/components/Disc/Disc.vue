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
  data () {
    return {
      songsList: []
    }
  },
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImg () {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
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
      if (!this.disc.dissid) {
        this.$router.push({path: '/recommend'})
        return
      }
      this.$jsonp('/qq_music_api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', {
        type: 1,
        json: 1,
        callbackQuery: 'jsonpCallback',
        callbackName: 'playlistinfoCallback',
        utf8: 1,
        onlysong: 0,
        disstid: this.disc.dissid,
        format: 'jsonp',
        g_tk: 974063726,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }).then(jsonp => {
        if (jsonp.code === 0) {
          console.log(jsonp.cdlist[0].songlist)
          this.songsList = this._normallizeSongs(jsonp.cdlist[0].songlist)
        }
      }).catch(err => {
        this.$vux.toast.text(err, 'middle')
      })
    },
    _normallizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
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
