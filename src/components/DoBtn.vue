<template>
  <div class="hm_btn" @click="handleClick"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scope>
  .hm_btn{
    background: #c30;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-size: 18px;
    border-radius: 24px;
    text-align: center;
  }
</style>
