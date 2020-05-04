<template>
  <div class="my-comments">
    <do-header>我的跟帖</do-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
        <div class="parent" v-if="item.parent">
          <p>回复： {{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <span class="one-txt-cut">原文：{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        this.loading = false
      }
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-size: 14px;
  line-height: 30px;
  .content {
    color: #000;
  }
  .time {
    color: #888;
  }
  .origin {
    color: #888;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .one-text-cut {
      flex: 1;
    }
  }
  .parent {
    margin: 10px 0;
    background-color: #ddd;
    padding: 10px;
    border: 5px;
    p:first-child {
      font-size: 12px;
    }
  }
}
</style>
