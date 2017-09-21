<template>
  <div class="player" v-show="palyList.length>0">
    <normal-player class="normal-player" v-show="fullScreen"></normal-player>
    <mini-player class="mini-player" v-show="!fullScreen"></mini-player>
  </div>
</template>

<script type="text/ecmascript-6">
import NormalPlayer from '@/components/base/NormalPlayer/NormalPlayer'
import MiniPlayer from '@/components/base/MiniPlayer/MiniPlayer'
import { mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {}
  },
  components: {
    NormalPlayer,
    MiniPlayer
  },
  computed: {
    ...mapGetters(['fullScreen', 'palyList'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.player {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #ccc;
  z-index: 20;
}
</style>
