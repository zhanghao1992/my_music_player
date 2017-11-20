<template>
  <div class="demo">
    <audio ref="audio" @ready="ready" src="1.mp3"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
  },
  methods: {
    ready () {
      this.$refs.audio.play()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.demo {
  height: 500px;
  /*background: #fff;*/
}
</style>
