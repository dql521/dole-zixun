<template>
  <div class="input_box">
    <input :type="type" :class="['hm_input',status]" :placeholder="placeholder" @input="handleInput">
    <span class="tips" v-show="showTips">{{esg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  props: {
    type: {
      type: String,
      defauit: 'text'
    },
    placeholder: {
      type: String,
      defauit: ''
    },
    value: {
      type: String,
      defauit: ''
    },
    rules: {
      type: RegExp
    },
    esg: {
      type: String
    }
  },
  methods: {
    handleInput (e) {
      const { value } = e.target
      this.$emit('input', value)
      if (!this.rules) return
      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  },
  computed: {
    showTips () {
      return this.status === 'error' && this.esg
    }
  }
}
</script>

<style lang="scss" scope>
.input_box{
  padding-bottom: 15px;
  position: relative;
  .hm_input{
    width: 100%;
    height: 38px;
    background: transparent;
    border-bottom: 1px solid #888;
    font-size: 18px;
    &.error{
      border-color: red;
    }
    &.success{
      border-color: green;
    }
  }
  .tips{
    color: red;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
