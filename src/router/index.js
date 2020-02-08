import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Registered from '../pages/Registered.vue'
import Profile from '../pages/Profile.vue'
import EditProfile from '../pages/EditProfile.vue'
import Follow from '../pages/Follow.vue'
import Test from '../pages/Test.vue'
import MyComments from '../pages/MyComments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registered',
      name: 'registered',
      component: Registered
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: EditProfile
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/my-comments',
      name: 'my-comments',
      component: MyComments
    },
    {
      path: '/my-star',
      name: 'my-star',
      component: MyStar
    }
  ]
})

const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow',
  'my-comments',
  '/my-star'
]
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
