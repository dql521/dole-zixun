<template>
  <div class="my-star">
    <do-header>我的收藏</do-header>
    <do-post v-for="item in list" :key="item.id" :post="item"></do-post>
  </div>
</template>

<script>
import DoPost from '../components/DoPost'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getStarList()
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  },
  components: {
    DoPost
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    flex: 1;
    display: flex;
    height: 75px;
    // 修改flex主轴的方向
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
    }
    .bottom {
      color: #888;
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  img {
    width: 120px;
    height: 75px;
    // object-fit:样式 可以保证图片在定死宽高的情况下不失真
    // object-fit: cover contain
    // background-size
    object-fit: cover;
  }
}
</style>
