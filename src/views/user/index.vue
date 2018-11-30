<template>
  <div>
    <div style="text-align: right;margin-bottom:10px;">
      <el-input
        placeholder="请输入用户名"
        v-model="query.userName" class="inputstyle">
        <i slot="prefix" class="el-input__icon el-icon-search" id="icon"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="getUsersByUserName()" style="float: left; margin-top: 50px">搜索</el-button>
      <el-button type="primary" @click="openAddDialog" style=" margin-top: 50px">新增人员</el-button>
    </div>
    <el-table border :data="tableData" :stripe="true">
      <el-table-column label="姓名" prop="userName"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="组织名称" prop="orgName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="openModifyDialog(scope.row)" type="info">修改</el-button>
          <el-button @click="remove(scope.row.userId)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="query.pageSize"
      @current-change="pageChange">
    </el-pagination>
    <UserForm :visible.sync="visible" @success="loadData" :title="title" :editData="editData"></UserForm>
  </div>
</template>

<script>
import UserForm from './form.vue'
import UserApi from '@/api/user'
export default {
  components: {UserForm},
  props: {
    orgNo: {type: Number}
  },
  data () {
    return {
      visible: false,
      title: '',
      itemId: 0,
      tableData: [],
      editData: {
        userName: null,
        password: null,
        userId: null
      },
      total: 0,
      query: {
        pageNum: 1,
        pageSize: 5,
        userName: ''
      }
    }
  },
  watch: {
    orgNo (val) {
      if (val) {
        this.getUserList(this.orgNo)
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    async loadData () {
      let resp = await UserApi.paging(this.query)
      this.tableData = resp.list
      this.total = resp.total
    },
    remove (userId) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let resp = await UserApi.remove(userId)
        if (resp.state === 1) {
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
          this.loadData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    openAddDialog () {
      this.visible = true
      this.title = '新增用户'
    },
    openModifyDialog (val) {
      this.editData = Object.assign({}, val)
      this.visible = true
      this.title = '修改用户'
    },
    async getUserList (orgNo) {
      let res = await UserApi.query(orgNo)
      this.tableData = res.data
    },
    // 模糊查询
    async getUsersByUserName () {
      let res = await UserApi.getUsers(this.query)
      this.tableData = res.data.list
      this.total = res.data.total
    },
    pageChange (page) {
      this.query.pageNum = page
      this.loadData()
    }
  }
}
</script>
<style scoped>
  .inputstyle{
    width: 300px;
    float: left;
    padding-top: 50px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  #icon{
    float: left;
    position: absolute;
    left: 15px;
    top:20px
  }
</style>
