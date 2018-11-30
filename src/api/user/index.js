
import axios from 'axios'

export default {
  // 查询所有用户
  paging: async (query) => {
    let resp = await axios.get(`/api/users/all?username=&pageNum=${query.pageNum}&pageSize=${query.pageSize}`)
    return resp.data
  },
  // 创建用户
  create: async (user) => {
    let resp = await axios.post('/api/users', user)
    return resp.data
  },
  // 删除用户
  remove: async (userId) => {
    let resp = await axios.delete(`/api/users/${userId}`)
    return resp.data
  },
  // 登录
  requestLogin: async (user) => {
    let resp = await axios.post('/api/users/actions/login', user)
    return resp.data
  },
  // 修改信息
  update: async (user) => {
    let resp = await axios.put('/api/users', user)
    return resp.data
  },
  // 查询某部门的用户
  query: async (orgNo) => {
    let resp = await axios.get(`/api/users/query/${orgNo}`)
    return resp.data
  },
  // 模糊查询
  getUsers: async (query) => {
    let resp = await axios.get(`/api/users/query?userName=${query.userName}&pageNum=${query.pageNum}&pageSize=${query.pageSize}`)
    return resp.data
  }
}
