<template>
  <div id="app">
    <m-header></m-header>

    <tab></tab>

    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import Tab from '@/components/Tab/Tab'

export default {
  name: 'app',
  data () {
    return {
      activeName: 'second'
    }
  },
  components: {
    MHeader,
    Tab
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@r: 20rem;
body {
  background: #324057;
  color: #fff;
}

</style>
