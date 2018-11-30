import User from '@/views/user'
import Login from '@/views/login'
import Org from '@/views/org'
import Manager from '@/views/manager'
import OrgTree from '@/views/org/org-tree'

let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/manager',
    name: '',
    component: Manager,
    children: [{
      path: '/user',
      component: User,
      meta: ['用户管理', '用户列表']
    }, {
      path: '/org',
      component: Org,
      meta: ['组织管理', '组织查询']
    }, {
      path: '/orgtree',
      name: '组织管理',
      component: OrgTree,
      meta: ['组织管理', '组织管理']
    }]
  }
]
export default routes
