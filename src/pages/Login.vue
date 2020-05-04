<template>
  <div class="login">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class=" iconfont iconnew"></i>
    </div>
    <div class="username">
      <do-input type="text" placeholder="请输入用户名" v-model="username" :rules="/^1\d{4,10}$/" esg="请输入正确的用户名"></do-input>
    </div>
    <div class="password">
      <do-input type="password" placeholder="请输入密码" v-model="password" :rules="/^\d{3,12}$/" esg="请输入3-12位数字密码"></do-input>
    </div>
    <div class="btn">
      <do-btn @click="login">登录</do-btn>
    </div>
    <div class="go-registered">
      没有账号？立即<router-link to="/registered">注册</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    const { username, password } = this.$route.params

    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户名或密码错误')
      } else {
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
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
   .go-registered{
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    a{
      color: cadetblue;
    }
  }
}
</style>
