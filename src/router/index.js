import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Registered from '../pages/Registered.vue'
import Profile from '../pages/Profile.vue'
import EditProfile from '../pages/EditProfile.vue'

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
      redirect: '/login'
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
    }
  ]
})

const AuthUrls = [
  '/profile',
  '/edit-profile'
]
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next('/login')
  }
})

export default router
