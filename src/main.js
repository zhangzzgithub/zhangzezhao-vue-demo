// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import routes from './router'
Vue.use(Router)

Vue.use(Element, {size: 'small'})

Vue.config.productionTip = false
const router = new Router({
  routes
})
/* 登录拦截 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('userName')
  }
  let userName = sessionStorage.getItem('userName')
  if (!userName && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
