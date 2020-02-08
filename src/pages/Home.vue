<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <hm-post v-for="post in item.postList" :key="post.id" :post="post"></hm-post>
      </van-tab>
  </van-tabs>
  </div>
</template>

<script>
import HmPost from '../components/HmPost'
export default {
  data () {
    return {
      active: 0,
      tabList: []
    }
  },
  async created () {
    await this.getTabList()
    this.getPostList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          item.postList = []
        })
        this.tabList = data
      }
    },
    async getPostList () {
      const id = this.tabList[this.active].id
      const res = await this.$axios.get('/post', {
        params: {
          category: id
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
      }
      this.tabList[this.active].postList = data
    }
  },
  watch: {
    active (value) {
      if (this.tabList[this.active].postList.length > 0) {
        return
      }
      this.getPostList()
    }
  },
  components: {
    HmPost
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    background-color: red;
    display: flex;
    text-align: center;
    color: #fff;
    .left,
    .right {
      width: 70px;
    }
    .search {
      flex: 1;
      height: 36px;
      line-height: 36px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 7px;
      border-radius: 18px;
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .iconnew {
      font-size: 50px;
    }
    .iconwode {
      font-size: 24px;
    }
  }
}
</style>
