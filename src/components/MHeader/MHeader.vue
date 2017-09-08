<template>
  <div class="header">
    <div>
      <img class="logo" src="./logo.png" alt="">
      <span class="name">my-music-player</span>
    </div>
  </div>
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
@r: 20rem;
.header {
  display: flex;
  justify-content: center;
  padding: 28/@r 0;
  background: #1F2D3D;
  font-size: 0;
  .logo {
    width: 50/@r;
    height: 50/@r;
    vertical-align: middle;
    margin-right: 10/@r;
  }
  .name {
    vertical-align: middle;
    font-size: 24/@r;
  }
}
</style>
