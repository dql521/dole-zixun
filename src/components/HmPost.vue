<template>
  <div class="hm-post">
    <!-- 视频类 -->
    <div class="video-post" v-if="post.type === 2">
      <div class="title txt-cut">{{post.title}}</div>
      <div class="video">
        <img :src="post.cover[0].url" alt="">
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 单图类 -->
    <div class="single-img-post" v-else-if="post.cover.length < 3">
      <div class="info">
        <div class="title txt-cut">{{post.title}}</div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <img :src="post.cover[0].url" alt="">
    </div>
    <!-- 多图类 -->
    <div class="multiple-img-post" v-else>
      <div class="title txt-cut">{{post.title}}</div>
      <div class="imgs">
        <img v-for="item in post.cover" :key="item.id" :src="item.url" alt="">
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-post {
  .title {
    font-size: 14px;
  }
  .bottom {
    color: #888;
    span:first-child {
      margin-right: 10px;
    }
  }
}
.single-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    flex: 1;
    display: flex;
    height: 75px;
    flex-direction: column;
    justify-content: space-between;
  }
  img {
    width: 120px;
    height: 75px;
    object-fit: cover;
  }
}
.multiple-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .video {
    position: relative;
    margin: 10px 0;
    img {
      width: 100%;
    }
    .iconshipin {
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, .5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      color: #fff;
      font-size: 30px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
