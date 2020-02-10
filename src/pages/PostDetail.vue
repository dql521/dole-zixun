<template>
  <div class="post-detail">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="btn-followed" v-if="detail.has_follow" @click="unfollow">已关注</div>
        <div class="btn-follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <!-- 新闻 -->
    <div class="main">
      <div class="post-title">{{detail.title}}</div>
      <div class="post-info">
        <span>{{detail.user.nickname}}</span>
        <span>{{detail.create_date | time}}</span>
      </div>
      <!-- 视频 -->
      <div class="video" v-if="detail.type === 2">
        <video :src="detail.content" controls></video>
      </div>
      <div class="content" v-else v-html="detail.content"></div>
    </div>
    <!-- 点赞分享 -->
    <div class="btns">
      <div class="good" @click="like" :class="{like: detail.has_like}">
        <i class="iconfont icondianzan"></i>
        <span>{{detail.like_length}}</span>
      </div>
      <div class="share">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <input type="text" placeholder="写跟帖">
      <div class="icon-comment">
        <i class="iconfont iconpinglun-"></i>
        <span class="num">12</span>
      </div>
      <i class="iconfont iconshoucang"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {
        user: {}
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
      }
    },
    async unfollow () {
      const id = this.detail.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注')
        this.detail.has_follow = false
      }
    },
    async follow () {
      const id = this.detail.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.detail.has_follow = true
      }
    },
    async like () {
      const id = this.detail.id
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getDetail()
        this.$toast.success(message)
      }
    }
  },
  watch: {
    $route () {
      this.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.post-detail{
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    .left {
      display: flex;
      .iconnew {
        font-size: 50px;
      }
    }
    .right {
      .btn-followed {
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 15px;
      }
      .btn-follow {
        border: 1px solid red;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 15px;
        background-color: red;
        color: #fff;
      }
    }
  }
  .main {
    padding: 10px;
    .post-title {
      font-size: 18px;
      font-weight: 700;
    }
    .post-info {
      color: #888;
      padding: 10px 0;
      span:first-child {
        margin-right: 10px;
      }
    }
    video {
      width: 100%;
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-bottom: 3px solid #ddd;
    margin-bottom: 40px;
    .good,
    .share {
      border: 1px solid #ccc;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 15px;
      font-size: 12px;

      .iconfont {
        margin-right: 5px;
        font-size: 14px;
      }
      .iconweixin {
        color: rgb(1, 200, 1)
      }
    }
    .like {
      color: red;
      border-color: red;
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background: #fff;
    input {
      width: 180px;
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      padding-left: 20px;
    }
    .iconfont {
      font-size: 24px;
    }
    .icon-comment {
      position: relative;
      .num {
        position: absolute;
        background-color: red;
        height: 20px;
        line-height: 20px;
        color: #fff;
        padding: 0 10px;
        border-radius: 10px;
        right: -20px;
        top: -4px;
      }
    }
  }
}
</style>
