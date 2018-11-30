import axios from 'axios'
export default {
  // 查询所有
  paging: async () => {
    let resp = await axios.get(`/api/orgs/all`)
    return resp.data
  },
  // 模糊查询
  queryOrgs: async (orgName) => {
    let resp = await axios.get(`/api/orgs/query?orgName=${orgName}`)
    return resp.data
  },
  // 创建部门
  create: async (org) => {
    let resp = await axios.post('/api/orgs', org)
    return resp.data
  },
  // 删除部门
  delete: async (orgId) => {
    let resp = await axios.delete(`api/orgs/${orgId}`)
    return resp.data
  },
  // 修改部门信息
  modify: async (org) => {
    let resp = await axios.put('api/orgs', org)
    return resp.data
  },
  // 根据上级部门号查询子部门
  queryOrgsByLeaderOrg: async (leaderOrg) => {
    let resp = await axios.get(`api/orgs?leaderOrg=${leaderOrg}`)
    return resp.data
  }
}
