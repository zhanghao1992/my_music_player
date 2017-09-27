<template>
  <transition name="slide">
    <music-list :title="title" :songs-list="songsList" :bg-img="bgImg" :rank="true"></music-list>
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
      songsList: [],
      bgImg: ''
    }
  },
  computed: {
    title () {
      return this.rank.topTitle
    },
    ...mapGetters(['rank'])
  },
  components: {
    MusicList
  },
  created () {
//    console.log(this.singer)
    this._getRankDetail()
  },
  methods: {
    _getRankDetail () {
      if (!this.rank.id) {
        this.$router.push({path: '/rank'})
        return
      }
      this.$jsonp('/qq_music_api/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        callbackQuery: 'jsonpCallback',
        g_tk: 989808312,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        topid: this.rank.id
      }).then(json => {
        if (json.code === 0) {
          this.bgImg = json.topinfo.pic_album
          this.songsList = this._normallizeSongs(json.songlist)
        }
      }).catch(err => {
        this.$vux.toast.text(err, 'middle')
      })
    },
    _normallizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let musicData = item.data
        if (musicData.albumid) {
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
