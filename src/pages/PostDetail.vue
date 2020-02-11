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
    <!-- 评论 -->
    <div class="post-commnet">
      <div class="title">精彩跟帖</div>
      <hm-comment
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
        @reply="reply">
        </hm-comment>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="comment-input" v-if="!isFoucs">
        <input type="text" placeholder="写跟帖" @focus="handleFoucs">
        <div class="icon-comment">
          <i class="iconfont iconpinglun-"></i>
          <span class="num">{{detail.comment_length}}</span>
        </div>
        <i class="iconfont iconshoucang" @click="star" :class="{star:detail.has_star}"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <div class="comment-textarea" v-else>
        <textarea rows="3" @blur="handleBlur" ref="textarea" v-model="content"></textarea>
        <div class="send" @click="send">发送</div>
      </div>
    </div>
    </div>
</template>

<script>
import HmComment from '../components/HmComment'
export default {
  components: {
    HmComment
  },
  data () {
    return {
      detail: {
        user: {}
      },
      isFoucs: false,
      commentList: [],
      parentId: '',
      content: ''
    }
  },
  created () {
    this.getDetail()
    this.getCommentList()
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
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
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
    },
    async handleFoucs () {
      this.isFoucs = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    handleBlur () {
      if (this.content) {
        return
      }
      this.isFoucs = false
    },
    async star () {
      const id = this.detail.id
      const res = await this.$axios.get(`/post_star/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },
    async reply (id) {
      this.parentId = id
      this.isFoucs = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      const id = this.detail.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      console.log(res)

      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('评论成功')
        this.getCommentList()
        this.isFoucs = false
        this.parentId = ''
        this.content = ''
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
.post-detail {
  padding-bottom: 100px;
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
  .post-commnet {
    .title {
      font-size: 18px;
      text-align: center;
      padding: 10px 0;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    .comment-input {
      display: flex;
      justify-content: space-around;
      align-items: center;
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
      .star {
        color: red;
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
    .comment-textarea {
      display: flex;
      width: 100%;
      padding: 0 20px;
      justify-content: space-between;
      align-items: flex-end;
      textarea {
        background-color: #ddd;
        width: 240px;
        height: 70px;
        border-radius: 10px;
        padding: 10px;
      }
      .send {
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: red;
        color: #fff;
        text-align: center;
        border-radius: 13px;
      }
    }
  }
}
</style>
