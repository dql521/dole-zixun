<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class=" iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input type="text" placeholder="请输入用户名" v-model="username" :rules="/^1\d{4,10}$/" esg="请输入正确的用户名"></hm-input>
    </div>
    <div class="password">
      <hm-input type="password" placeholder="请输入密码" v-model="password" :rules="/^\d{3,12}$/" esg="请输入3-12位数字密码"></hm-input>
    </div>
    <div class="btn">
      <hm-btn @click="login">登录</hm-btn>
    </div>
  </div>
</template>

<script>
import HmInput from '../components/HmInput'
import HmBtn from '../components/HmBtn'
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    HmInput,
    HmBtn
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 401) {
        alert('用户名或密码错误')
      } else {
        alert('登录成功')
      }
    }
  }

}
</script>

<style lang="scss" scope>
.login{
  padding: 20px;
  .close{
    i{
      font-size: 27px;
    }
  }
  .logo{
    text-align: center;
    i{
      font-size: 126px;
      color: #d81e06;
    }
  }
  .btn{
    margin-top: 20px;
  }
}
</style>
