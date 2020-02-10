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
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
        <hm-post v-for="post in item.postList" :key="post.id" :post="post"></hm-post>
        </van-list>
        </van-pull-refresh>
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
      tabList: [],
      pageSize: 5,
      loading: false,
      refreshing: false
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
          item.pageIndex = 1
          item.finished = false
        })
        this.tabList = data
      }
    },
    async getPostList () {
      const id = this.tabList[this.active].id
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.tabList[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList[this.active].postList = [...this.tabList[this.active].postList, ...data]
        this.loading = false
        setTimeout(() => {
          this.refreshing = false
        }, 1000)
        if (data.length < this.pageSize) {
          this.tabList[this.active].finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        this.tabList[this.active].pageIndex++
        this.getPostList()
      }, 1000)
    },
    onRefresh () {
      this.loading = true
      this.tabList[this.active].pageIndex = 1
      this.tabList[this.active].postList = []
      this.tabList[this.active].finished = false
      this.getPostList()
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
