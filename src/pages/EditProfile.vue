<template>
  <div class="edit-profile">
    <hm-header>编辑资料</hm-header>
    <div class="user_box">
      <div class="avatar">
        <img :src="avatar">
        <!-- 上传组件 -->
        <van-uploader :after-read="afterRead"/>
      </div>
      <hm-nav name="昵称" :desc="profile.nickname" @click="ShowNickname"></hm-nav>
      <hm-nav name="密码" desc="******" @click="showPassword"></hm-nav>
      <hm-nav name="性别" :desc="profile.gender === 1 ? '男' : '女'" @click="showGender"></hm-nav>
    </div>
    <!-- 显示昵称 -->
    <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="editNickname">
       <van-field v-model="nickname" placeholder="请输入修改的昵称" />
    </van-dialog>
    <!-- 显示密码 -->
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="editPassword">
       <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>
    <!-- 显示性别 -->
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="editGender">
      <!-- name代表单选框选中的值 -->
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import img from '../assets/img.png'
export default {
  data () {
    return {
      profile: {},
      loading: false,
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 0
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
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`)
      this.profile = res.data.data
      this.loading = true
    },
    async editProfile (data) {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getProfile()
      }
    },
    ShowNickname () {
      this.isShowNickname = true
      this.nickname = this.profile.nickname
    },
    editNickname () {
      this.editProfile({ nickname: this.nickname })
    },
    showPassword () {
      this.isShowPassword = true
      this.password = this.profile.password
    },
    editPassword () {
      this.editProfile({ password: this.password })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    editGender () {
      this.editProfile({ gender: this.gender })
    },
    async afterRead (file) {
      // 校验图片格式和大小
      if (file.file.type === 'image/gif') {
        this.$toast('头像不支持gif格式动图')
        return
      }
      if (file.file.size / 1024 >= 20) {
        this.$toast('请上传20kb以内的图片')
        return
      }
      const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.editProfile({ head_img: data.url })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user_box {
  padding: 0 20px;
  .avatar {
    padding: 30px 0;
    position: relative;
    img {
      width: 70px;
      height: 70px;
      margin: 0 auto;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
}
.van-field{
  border: 1px solid #ccc;
  margin: 10px auto;
  padding: 5px;
  width: 90%;

}
</style>
