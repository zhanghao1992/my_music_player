<template>
  <div class="">
    <el-row class="tab">
      <router-link tag="div" :to="{ path: '/recommend' }" active-class="tab-item-active">
        <el-col :span="6">
          <div class="tab-item">推荐</div>
        </el-col>
      </router-link>

      <router-link tag="div" :to="{ path: '/singer' }" active-class="tab-item-active">
        <el-col :span="6">
          <div class="tab-item">歌手</div>
        </el-col>
      </router-link>
      <router-link tag="div" :to="{ path: '/rank' }" active-class="tab-item-active">
        <el-col :span="6">
          <div class="tab-item">排行</div>
        </el-col>
      </router-link>
      <router-link tag="div" :to="{ path: '/search' }" active-class="tab-item-active">
        <el-col :span="6">
          <div class="tab-item">搜索</div>
        </el-col>
      </router-link>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tab, TabItem } from 'vux'

export default {
  name: '',
  data () {
    return {}
  },
  components: {
    Tab,
    TabItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@r: 20rem;
.tab {
  .tab-item {
    text-align: center;
    color: #fff;
    line-height: 40/@r;
    height: 40/@r;
    font-size: 24/@r;
    margin: 10/@r 46/@r;
  }
  .tab-item-active {
    .tab-item {
      color: #f2df09;
      border-bottom: 1/@r solid #f2df09;
    }
  }
}
</style>
