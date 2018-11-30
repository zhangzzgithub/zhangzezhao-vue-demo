<template>
  <div class="custom-tree-container">
    <el-row :gutter="20">
      <el-col :span="10"><div class="grid-content bg-purple">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="size" @click="addOrg" class="el-icon-plus" >添加新部门</el-button>
          <el-tree :props="treeProp" :load="loadOrg"  :expand-on-click-node="false" lazy accordion>
        <span  class="custom-tree-node"  slot-scope="{node, data}">
                <span @click="search(data)">{{node.label}}</span>
           <span>
             <el-button  type="text" size="mini" @click="updateOrg(data)">
               <i class="el-icon-edit"></i>修改
             </el-button>
             <el-button type="text" size="mini" @click="deleteOrg(node, data)">
               <i class="el-icon-delete"></i>删除
          </el-button>
        </span>
        </span>
          </el-tree>
        </div>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
        <UserIndex :orgNo="checkNo" class="userIndex"></UserIndex>
      </div></el-col>
    </el-row>

    <el-dialog :title="treeTitle" :visible.sync="isShow" >
      <div>
        <el-form ref="treeForm" label-width="100px" :model="treeForm" :rules="rules">
          <el-input v-model="treeForm.orgNo" type="hidden"></el-input>
          <el-form-item label="组织名" prop="orgName">
            <el-input v-model="treeForm.orgName"></el-input>
          </el-form-item>
          <el-form-item label="组织编号" prop="orgNo">
            <el-input v-model="treeForm.orgNo"></el-input>
          </el-form-item>
          <el-form-item label="组织地点" prop="orgLoc">
            <el-input v-model="treeForm.orgLoc"></el-input>
          </el-form-item>
          <el-form-item label="ID" prop="orgId"  :hidden="true">
            <el-input v-model="treeForm.orgId"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" prop="leaderOrg">
            <el-select :disabled="disabled" v-model="treeForm.leaderOrg" clearable placeholder="请选择">
              <el-option key="0" label="请选择" value="0"></el-option>
              <el-option
                v-for="item in orgTree"
                :value= "item.orgNo"
                :label="item.orgName"
                :key="item.orgId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveOrg">保存</el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OrgApi from '@/api/org'
import UserIndex from '@/views/user/index'
export default {
  components: {UserIndex},
  data () {
    return {
      disabled: false,
      checkNo: null,
      treeProp: {
        label: 'orgName',
        id: 'orgId',
        children: 'child',
        isLeaf: 'leaf'
      },
      orgTree: {
        orgId: '',
        orgNo: '',
        orgName: '',
        leaderOrg: '',
        orgLoc: ''
      },
      visible: false,
      // 弹出框标题
      treeTitle: '',
      // 弹出框是否展示
      isShow: false,
      title: '',
      // 弹出框数据
      treeForm: {
        orgId: '',
        orgNo: '',
        orgName: '',
        leaderOrg: '',
        orgLoc: ''
      },
      rules: {
        orgName: {
          required: true, message: '请输入组织名称'},
        orgNo: {
          required: true, message: '请输入组织编号'}
      }
    }
  },
  async mounted () {
    // 查询所有的部门
    let list = await OrgApi.paging()
    this.orgTree = list
  },
  methods: {
    // 把所有树形关系遍历到数组中
    async loadOrg (node, resolve) {
      let res = []
      if (node.level === 0) {
        res = await OrgApi.queryOrgsByLeaderOrg(0)
      } else {
        res = await OrgApi.queryOrgsByLeaderOrg(node.data.orgNo)
      }
      resolve(res)
    },
    addOrg () {
      this.treeForm = {
        orgId: null,
        orgNo: null,
        orgName: null,
        leaderOrg: null
      }
      this.isShow = true
      this.treeTitle = '添加新的部门'
      this.disabled = false
    },
    updateOrg (data) {
      this.isShow = true
      this.treeTitle = '修改部门信息'
      this.treeForm = {
        orgId: data.orgId,
        orgName: data.orgName,
        orgNo: data.orgNo,
        leaderOrg: data.leaderOrg,
        orgLoc: data.orgLoc
      }
      this.disabled = true
    },
    saveOrg () {
      this.$refs['treeForm'].validate(async valid => {
        if (valid) {
          let res = []
          if (this.disabled === true) {
            res = await OrgApi.modify(this.treeForm)
          } else {
            res = await OrgApi.create(this.treeForm)
          }
          if (res.state === 1) {
            this.isShow = false
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.loadTree()
          } else {
            this.isShow = false
            this.$message({
              message: res.message,
              type: 'fail'
            })
          }
        }
      })
    },
    deleteOrg (node, data) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let resp = await OrgApi.delete(data.orgId)
        if (resp.state === 1) {
          this.$message({
            message: resp.message,
            type: 'success'
          })
          this.loadTree()
        } else {
          this.$message({
            message: resp.message,
            type: 'fail'
          })
        }
      }).catch(() => {

      })
    },
    close () {
      this.isShow = false
    },
    async search (data) {
      this.checkNo = data.orgNo
    },
    loadTree () {
      this.$router.push({
        name: '组织管理',
        query: {
          _t: Date.now()
        }
      }
      )
    }
  }
}
</script>

<style scoped>
  div{
    background: ghostwhite;
  }
  .el-row {
    margin-bottom: 20px;
    width:1250px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: ghostwhite;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
