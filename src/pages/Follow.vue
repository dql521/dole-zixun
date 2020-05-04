<template>
  <div class="follow">
    <do-header>我的关注</do-header>
    <div class="item" v-for="item in followList" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="">
      </div>
      <div class="center">
        <p class="name">{{item.nickname}}</p>
        <p class="time">{{item.create_date | time}}</p>
      </div>
      <div class="right" @click="unfollow(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      followList: []
    }
  },
  created () {
    this.getFollowList()
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定取消关注该用户吗？'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success('取消成功')
          this.getFollowList()
        }
      } catch {
        this.$toast('操作取消')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 20px;
  align-items: center;
  .left {
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    .name {
      font-size: 18px;
      color: #000;
    }
    .time {
      color: #999;
      font-size: 14px;
    }
  }
  .right {
    height: 30px;
    line-height: 30px;
    background-color: #ddd;
    padding: 0 10px;
    border-radius: 15px;
    color: #000;
  }
}
</style>
