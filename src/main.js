import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../src/styles/base.css'
import '../src/styles/iconfont.css'
import axios from 'axios'
import HmInput from './components/HmInput.vue'
import HmBtn from './components/HmBtn'
import HmNav from './components/HmNav.vue'
import HmHeader from './components/HmHeader.vue'
import moment from 'moment'

Vue.component('HmInput', HmInput)
Vue.component('HmBtn', HmBtn)
Vue.component('HmNav', HmNav)
Vue.component('HmHeader', HmHeader)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.response.use(function (response) {
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    this.$toast.fail('用户信息获取失败')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
Vue.filter('time', function (input) {
  return moment(input).format('YYYY-MM-DD')
})
Vue.use(Vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
