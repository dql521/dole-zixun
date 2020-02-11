<template>
  <div class="hm-comment">
    <div class="title">
      <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
      <div class="reply" @click="reply(comment.id)">回复</div>
    </div>
    <hm-floor :index="index" v-if="comment.parent" :comment="comment.parent"></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from './HmFloor'
export default {
  data () {
    return {
      index: this.getCommentLength(0, this.comment)
    }
  },
  components: {
    HmFloor
  },
  props: {
    comment: Object
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
    },
    getCommentLength (num, comment) {
      if (comment.parent) {
        return this.getCommentLength(num + 1, comment.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    margin-bottom: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      padding-left: 10px;
      .name {
        font-size: 14px;
      }
      .time {
        color: #888;
      }
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
