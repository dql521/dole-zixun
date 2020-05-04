<template>
  <div class="tab-manage">
    <do-header>栏目管理</do-header>
    <div class="content">
      <div class="title">点击删除以下频道（至少保留3个）</div>
      <div class="list">
        <div class="item" v-for="(item, index) in activeTabs" :key="item.id" @click="del(index)">{{item.name}}</div>
      </div>

      <div class="title">点击添加以下频道</div>
       <div class="list">
        <div class="item" v-for="(item, index) in deactiveTabs" :key="item.id" @click="add(index)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTabs: [],
      deactiveTabs: []
    }
  },
  created () {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
    } else {
      this.getTabList()
    }
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeTabs = data
      }
    },
    del (index) {
      if (this.activeTabs.length <= 3) {
        return
      }
      this.deactiveTabs.push(this.activeTabs[index])
      this.activeTabs.splice(index, 1)
    },
    add (index) {
      this.activeTabs.push(this.deactiveTabs[index])
      this.deactiveTabs.splice(index, 1)
    }
  },
  watch: {
    activeTabs () {
      localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-manage {
  .content {
    padding: 10px;
  }
  .title {
    color: #888;
    padding: 10px 0;
  }
  .list {
    overflow: hidden;
    .item {
      float: left;
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #eee;
      background-color: #eee;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
