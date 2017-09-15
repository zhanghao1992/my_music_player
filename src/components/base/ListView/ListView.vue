<template>
  <scroll class="list-view" ref="listWrapper" :data="data">
    <ul class="list-out">
      <li class="itemgroup" ref="itemgroup" v-for="(itemgroup, index) in data">
        <h4 class="title">{{ itemgroup.title }}</h4>
        <ul class="list-inner">
          <li class="item" v-for="item in itemgroup.items">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="sub-list">
      <li v-for="(itemgroup, index) in data" :class="{active: index===activeIndex}" @touchstart="tabStartHandler(index)">
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
      activeIndex: 0
    }
  },
  components: {
    Scroll
  },
  methods: {
    tabStartHandler (index) {
      this.$refs.listWrapper.scrollToElement(this.$refs.itemgroup[index], 0)
      this.activeIndex = index
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
          border-bottom: 1px solid #3b4750;
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
      &.active {
        color: #f2df09;
        line-height: 40/@r;
      }
    }
  }
}
</style>
