<template>
  <div id="app">
    <m-header></m-header>

    <tab></tab>

    <router-view></router-view>

    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import Tab from '@/components/Tab/Tab'
import Player from '@/components/Player/Player'

export default {
  name: 'app',
  data () {
    return {
      activeName: 'second'
    }
  },
  components: {
    MHeader,
    Tab,
    Player
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less">
@r: 20rem;
body {
  background: #324057;
  color: #fff;
}

</style>
