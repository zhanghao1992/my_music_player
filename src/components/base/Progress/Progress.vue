<template>
  <div class="progress" ref="progress" @click="clickHandler($event)">
    <div class="inner-bar" :style="{width: percent+'%'}">
      <div class="dot" @touchstart.prevent="touchstartHnadler($event)" @touchmove.prevent="touchmovetHnadler($event)"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      startX: 0,
      endX: 0,
      barWidth: 0
    }
  },
  methods: {
    clickHandler (e) {
      this.barWidth = this.$refs.progress.clientWidth
      let newPercent = this.percent + ((e.offsetX - this.percent * this.barWidth / 100) / this.barWidth) * 100
      console.log(this.barWidth)
      this.$emit('barDrag', newPercent)
    },
    touchstartHnadler (e) {
      this.$emit('barDragStart')
    },
    touchmovetHnadler (e) {
      this.barWidth = this.$refs.progress.clientWidth
      let newPercent = this.percent + ((e.targetTouches[0].pageX - this.$refs.progress.offsetLeft - this.percent * this.barWidth / 100) / this.barWidth) * 100
      if (newPercent > 100) {
        newPercent = 100
      } else if (newPercent < 0) {
        newPercent = 0
      }
      this.$emit('barDrag', newPercent)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.progress {
  height: 6/@r;
  background-color: #ccc;
  border-radius: 3/@r;
}
.inner-bar {
  background-color: #f60;
  height: 100%;
  border-radius: 3/@r;
  position: relative;
  .dot {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate3d(5/@r, -5/@r, 0);
    width: 16/@r;
    height: 16/@r;
    background-color: #f43530;
    border-radius: 50%;
  }
}
</style>
