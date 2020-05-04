<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="请输入搜索关键字" v-model="keyword">
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <div class="post-list" v-if="postList.length > 0">
      <do-post v-for="item in postList" :key="item.id" :post="item"></do-post>
    </div>
    <div class="content" v-else>
      <h3>历史记录</h3>
      <ul>
        <li v-for="item in history" :key="item" @click="hotSearch(item)">{{item}}</li>
      </ul>

      <h3>热门搜索</h3>
      <ul>
        <li v-for="item in hotKeys" :key="item" @click="hotSearch(item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import DoPost from '../components/DoPost'
export default {
  components: {
    DoPost
  },
  data () {
    return {
      keyword: '',
      postList: [],
      hotKeys: ['说好不哭', '关晓彤', '王祖贤', '性感'],
      history: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    async search () {
      const res = await this.$axios.get(`/post_search`, {
        params: {
          keyword: this.keyword
        }
      })

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
      if (data.length === 0) {
        this.$toast('未找到匹配内容')
        this.keyword = ''
      }
    },
    back () {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    hotSearch (item) {
      this.keyword = item
      this.search()
    }
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.postList = []
      }
    }
  }
}
</script>

<style lang="scss" scope>
  .search {
  .header {
    display: flex;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    .left,
    .right {
      width: 50px;
      text-align: center;
    }
    .center {
      flex:1;
      height: 34px;
      margin-top: 7px;
      border: 1px solid #ccc;
      border-radius: 17px;
      display: flex;
      padding-right: 20px;
      .iconfont {
        width: 40px;
        line-height: 34px;
        text-align: center;
      }
      input {
        flex: 1;
        font-size: 12px;
        background-color: #f7f7f7;
      }
    }
  }
  .content {
    padding: 20px;
    h3 {
      font-size: 18px;
      font-weight: 700;
    }
  li {
      width: 20%;
      height: 30px;
      line-height: 30px;
      display: inline-block;
    }
  }
}
</style>
