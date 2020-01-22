<template>
  <div class="edit-profile">
    <hm-header>编辑资料</hm-header>
    <div class="user_box">
      <div class="avatar">
        <img :src="avatar">
      </div>
      <hm-nav name="昵称" :desc="profile.nickname"></hm-nav>
      <hm-nav name="密码" desc="******"></hm-nav>
      <hm-nav name="性别" :desc="profile.gender === 1 ? '男' : '女'"></hm-nav>
    </div>
  </div>
</template>

<script>
import img from '../assets/img.png'
export default {
  data () {
    return {
      profile: {},
      loading: false
    }
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    this.profile = res.data.data
    this.loading = true
  }
}
</script>

<style lang="scss" scoped>
  .user_box {
  padding: 0 20px;
  .avatar {
    padding: 30px 0;
    img {
      width: 70px;
      height: 70px;
      margin: 0 auto;
      border-radius: 50%;
    }
  }
}
</style>
