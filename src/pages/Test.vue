<template>
  <div class="test">
     <vueCropper
       ref="cropper"
       :img="option.img"
       :autoCrop="option.autoCrop"
       :fixed="option.fixed"
       :fixedNumber="option.fixedNumber"
       :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight">
          </vueCropper>
  <img :src="src" alt="">
  <van-button type="primary" @click="crop">裁剪</van-button>
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
      src: '',
      option: {
        img: img, // 裁剪图片的地址
        outputType: 'jpeg', // 裁剪生成图片的格式
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1] // 截图框的宽高比例
      }
    }
  },
  methods: {
    crop () {
      this.$refs.cropper.getCropData(data => {
        this.src = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
}
.van-button {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
