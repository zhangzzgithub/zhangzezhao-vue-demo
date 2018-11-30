<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-input
        placeholder="请输入组织名称"
        v-model="orgName" style="width: 300px">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="getOrgs">搜索</el-button>
    </div>
    <el-table border :data="tableData" :stripe="true">
      <el-table-column label="部门名称" prop="orgName"></el-table-column>
      <el-table-column label="上级部门" prop="leaderOrgName"></el-table-column>
      <el-table-column label="部门地址" prop="orgLoc"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import OrgApi from '@/api/org'
export default {
  data () {
    return {
      visible: false,
      tableData: [],
      leaderOrg: '',
      orgName: ''
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    async loadData () {
      let resp = await OrgApi.paging()
      this.tableData = resp
    },
    // 模糊查询
    async getOrgs () {
      let data = await OrgApi.queryOrgs(this.orgName)
      this.tableData = data.data
    }
  }
}
</script>

<style scoped>

</style>
