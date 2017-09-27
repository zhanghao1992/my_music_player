<template>
  <scroll class="list-view" ref="listWrapper" :data="data" :probeType="2" @on-scroll="scrollHnadler">
    <ul class="list-out" ref="lisOut">
      <li class="itemgroup" ref="itemgroup" v-for="(itemgroup, index) in data">
        <h4 class="title">{{ itemgroup.title }}</h4>
        <ul class="list-inner">
          <li class="item" v-for="item in itemgroup.items" @click="selectSinger(item)">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="sub-list" ref="subList">
      <li v-for="(itemgroup, index) in data"
        :class="{active: index===activeIndex}"
        @click.stop.prevent="tabStartHandler($event, index)">
        <!--@touchmove.stop.prevent="tabMoveHandler($event)"-->
        {{ itemgroup.title.substr(0, 1) }}
      </li>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/components/base/scroll/scroll'

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      activeIndex: 0,
      listHeight: [],
      scrollY: -1
//      startY: 0,
//      endY: 0,
//      disY: 0,
//      LsY: 0,
//      LeY: 0,
//      ratio: 1
    }
  },
  components: {
    Scroll
  },
  watch: {
    data () {
      setTimeout(() => {
        const listEles = this.$refs.itemgroup
        const listLength = listEles.length
        let h = 0
        for (let i = 0; i < listLength; i += 1) {
          this.listHeight.push(h)
          h += listEles[i].getBoundingClientRect().height
        }
        this._setRatio()
      }, 20)
    },
    scrollY (newY) {
      const length = this.listHeight.length
      for (let i = 0; i < length; i += 1) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (!h2 || (h1 < -newY && -newY <= h2)) {
          this.activeIndex = i
          return
        }
      }
      this.activeIndex = 0
    }
  },
  methods: {
    tabStartHandler (event, index) {
      this.$refs.listWrapper.scrollToElement(this.$refs.itemgroup[index], 0)
      this.activeIndex = index
//      this.startY = event.touches[0].pageY
    },
//    tabMoveHandler (event) {
//      this.endY = event.touches[0].pageY
//      this.disY = this.endY - this.startY
//      console.log(this.activeIndex, this.listHeight[this.activeIndex], this.disY)
//      this.scrollY = this.listHeight[this.activeIndex] - this.disY
//      this.$refs.listWrapper.scrollTo(0, -this.scrollY, 0)
//    },
    scrollHnadler (pos) {
      this.scrollY = pos.y
    },
    _setRatio () {
      this.ratio = this.$refs.subList.getBoundingClientRect().height / this.$refs.lisOut.getBoundingClientRect().height
    },
    selectSinger (item) {
      this.$emit('to-detail', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.list-view {
  height: 100%;
  overflow: hidden;
  position: relative;
  .list-out {
    .itemgroup {
      .title {
        font-weight: 200;
        font-size: 20/@r;
        background: #617a8e;
        padding: 10/@r;
      }
      .list-inner {
        color: #969899;
        .item {
          display: flex;
          border-bottom: 1px solid #72787c;
          padding: 10/@r 0;
          .avatar {
            width: 80/@r;
            height: 80/@r;
            border-radius: 50%;
            margin: 10/@r 40/@r;
          }
          .name {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  .sub-list {
    position: absolute;
    right: 20/@r;
    top: 80/@r;
    li {
      list-style: none;
      text-align: center;
      line-height: 34/@r;
      &.active {
        color: #f2df09;
      }
    }
  }
}
</style>
