<template>
    <div class="item" @click="handleclick">
      <div class="left">{{name}}</div>
      <div class="center">{{desc}}</div>
      <div class="right">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  },
  methods: {
    handleclick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  font-size: 14px;
  color: #999;
  .left {
    color: #000;
    font-size: 16px;
  }
  .center {
    flex: 1;
    text-align: right;
  }
  .right{
    i{
      line-height: 50px;
    }
  }
}
</style>
