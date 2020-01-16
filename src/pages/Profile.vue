<template>
  <div class="profile">
    <div class="user_info">
      <div class="avatar">
        <img src="http://m.imeitou.com/uploads/allimg/160804/3-160P4122343-50.jpg" alt="">
      </div>
      <div class="info">
        <p>
          <i class="iconfont iconxingbienv"></i>
          <span>温柔默默</span>
        </p>
        <p>2020-01-01</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="fn"></hm-nav>
      <hm-nav name="我得跟帖" desc="跟帖/回复"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频"></hm-nav>
      <hm-nav name="设置"></hm-nav>
    </div>
  </div>
</template>

<script>
export default {
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
            color: #F144BE;
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
