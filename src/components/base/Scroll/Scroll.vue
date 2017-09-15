<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  name: '',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {}
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  methods: {
    _initScroll () {
      if (this.$refs.wrapper) {
        this.Scroll = new BScroll(this.$refs.wrapper, {
          click: this.click,
          probeType: this.probeType
        })
      }
    },
    refresh () {
      this.Scroll && this.Scroll.refresh()
    },
    enable () {
      this.Scroll && this.Scroll.enable()
    },
    disable () {
      this.Scroll && this.Scroll.disable()
    },
    scrollToElement (el, time) {
      this.Scroll && this.Scroll.scrollToElement(el, time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
