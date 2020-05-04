<template>
<div class="wrapper">
  <hm-floor v-if="comment.parent" :comment="comment.parent" :index="index-1" @reply="reply"></hm-floor>
  <div class="hm-floor">
      <div class="title">
        <div class="name">{{index}} {{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
        <div class="reply" @click="reply(comment.id)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    index: Number
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-floor {
  border: 1px solid #ccc;
  background-color: #eee;
  padding: 10px;
  .title {
    display: flex;
    align-items: flex-end;
    padding-bottom : 10px;
    .name {
      font-size: 14px;
    }
    .time {
      margin-left: 5px;
      flex: 1;
    }
  }
  .content {
    font-size: 14px;
  }
}
</style>
