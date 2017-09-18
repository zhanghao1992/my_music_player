<template>
  <transition name="slide">
    <div class="SingerDetail">
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
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
