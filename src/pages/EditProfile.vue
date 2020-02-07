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
    <!-- 头像裁剪 -->
  <div class="mask" v-show="isShowMask">
     <vueCropper
       ref="cropper"
       :img="option.img"
       :autoCrop="option.autoCrop"
       :fixed="option.fixed"
       :fixedNumber="option.fixedNumber"
       :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight">
          </vueCropper>
  <van-button type="default" @click="crop">裁剪</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import img from '../assets/img.png'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      profile: {},
      loading: false,
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 0,
      isShowMask: false,
      option: {
        img: '', // 裁剪图片的地址
        outputType: 'jpeg', // 裁剪生成图片的格式
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1] // 截图框的宽高比例
      }
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
      this.isShowMask = true
      this.option.img = file.content
    },
    crop () {
      this.$refs.cropper.getCropData(async imgData => {
        const file = this.convertBase64UrlToBlob(imgData)
        const fd = new FormData()
        fd.append('file', file)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editProfile({ head_img: data.url })
        }
        this.isShowMask = false
      })
    },
    // 可以把图片的base64编码转成一个file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1])// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
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
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
//   .van-button {
//   position: fixed;
//   bottom: 0;
//   left: 50%;
//   transform: translateX(-50%);
// }
}

</style>
