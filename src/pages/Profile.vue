<template>
  <div class="profile">
    <do-header>个人中心</do-header>
    <div class="user_info" @click="$router.push('/edit-profile')">
      <div class="avatar">
        <img v-show="loading" :src="avatar">
      </div>
      <div class="info">
        <p>
          <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <do-nav name="我的关注" desc="关注的用户" @click="$router.push('/follow')"></do-nav>
      <do-nav name="我得跟帖" desc="跟帖/回复" @click="$router.push('/my-comments')"></do-nav>
      <do-nav name="我的收藏" desc="文章/视频" @click="$router.push('/my-star')"></do-nav>
      <do-nav name="栏目管理" @click="$router.push('/tab-manage')"></do-nav>
      <do-nav name="设置" @click="$router.push('/edit-profile')"></do-nav>
      <do-nav name="退出登录" @click="logout"></do-nav>
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
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出吗？'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
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
  }
}
</script>

<style lang="scss" scope>
  .profile{
    .user_info{
      padding: 20px;
      display: flex;
      border-bottom: 3px solid #ccc;
      .avatar{
        width: 70px;
        height: 70px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .info{
        flex: 1;
        margin-top: 10px;
        p{
          font-size: 16px;
          line-height: 30px;
          i{
            font-size: 18px;
            &.iconxingbienan{
              color: #44ACF1;
            }
            &.iconxingbienv{
              color: hotpink;
            }
          }
          &:last-child{
            color: #888;
          }
        }
      }
      .icon{
        width: 30px;
        i{
          line-height: 70px;
        }
      }
    }
    .list{
      padding: 0 20px;
    }
  }

</style>
