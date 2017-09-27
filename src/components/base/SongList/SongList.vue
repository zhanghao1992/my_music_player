<template>
  <div class="songList">
    <ul class="content">
      <li class="list-item" v-for="(song,index) in songsList" @click="selectItem(song,index)">
        <div v-if="rank">
          asdasd
        </div>
        <div>
          <h2 class="name" v-html="song.name"></h2>
          <p class="desc">{{ song | desc }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    songsList: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  filters: {
    desc (song) {
      return `${song.singer}～${song.album}`
    }
  },
  mounted () {
//    console.log(this.songs)
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@r: 20rem;
.songList {
  padding: 0 40/@r;
  .content {
    .list-item {
      margin-top: 16/@r;
      display: flex;
      .name {
        font-size: 22/@r;
        line-height: 28/@r;
      }
      .desc {
        font-size: 20/@r;
        line-height: 36/@r;
        color: #aaa;
      }
    }
  }
}
</style>
