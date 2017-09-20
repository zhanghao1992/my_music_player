<template>
  <div class="songList">
    <ul class="content">
      <li class="list-item" v-for="song in songsList">
        <h2 class="name" v-html="song.name"></h2>
        <p class="desc">{{ song | desc }}</p>
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
    }
  },
  data () {
    return {}
  },
  filters: {
    desc (song) {
      return `${song.singer}。${song.album}`
    }
  },
  mounted () {
//    console.log(this.songs)
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
