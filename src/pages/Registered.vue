<template>
  <div class="registered">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input type="text" placeholder="请输入用户名" v-model="form.username" :rules="/^1\d{4,10}$/" esg="请输入正确的用户名"></hm-input>
    </div>
    <div class="nickname">
      <hm-input type="text" placeholder="请输入昵称" v-model="form.nickname" :rules="/^[\u4e00-\u9fa5]{3,8}$/" esg="请输入正确的昵称"></hm-input>
    </div>
    <div class="password">
      <hm-input type="password" placeholder="请输入密码" v-model="form.password" :rules="/^\d{3,12}$/" esg="请输入3-12位数字密码"></hm-input>
    </div>
    <div class="btn">
      <hm-btn @click="registered">注册</hm-btn>
    </div>
    <div class="go-login">
      已有账号？立即<router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        nickname: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async registered () {
      if (!this.form.username && !this.form.nickname && !this.form.password) {
        return this.$toast.fail('内容不能为空')
      }
      const res = await this.$axios.post('/register', this.form)
      if (res.data.status === 400) {
        this.$toast.fail('用户名已经存在')
      } else {
        this.$toast.success('注册成功')
        console.log(this.form.username)

        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scope>
.registered{
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
  .go-login{
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
