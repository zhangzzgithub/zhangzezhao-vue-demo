<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="600px"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="userForm" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item  label="所在组织" prop="orgNo">
          <el-select v-model="userForm.orgNo" placeholder="请选择">
            <el-option
              v-for="item in orgForm"
              :value= "item.orgNo"
              :label="item.orgName"
              :key="item.orgId"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>

</template>
<script>
import UserApi from '@/api/user'
import OrgApi from '@/api/org'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    editData: {
      type: Object
    },
    orgData: {
      type: Array
    },
    flag: {
      type: Number
    }
  },

  watch: {
    visible (val) {
      if (this.title === '修改用户') {
        this.userForm = this.editData
      }
      if (!val) {
        this.$emit('update:visible', false)
        if (this.title === '新增用户') {
          this.userForm = {
            username: null,
            password: null,
            deptId: null
          }
        }
        this.$refs['form'].resetFields()
      }
    }
  },
  data () {
    return {
      orgForm: {
        orgId: '',
        orgNo: '',
        orgName: '',
        orgLoc: '',
        leaderOrg: ''
      },
      rules: {
        userName: [
          {required: true, trigger: 'change', message: '请输入姓名!'}
        ],
        password: [
          {required: true, trigger: 'change', message: '请输入密码!'}
        ]
      },
      userForm: {
        userId: '',
        userName: '',
        password: '',
        orgNo: ''
      }
    }
  },
  async mounted () {
    let list = await OrgApi.paging()
    this.orgForm = list
  },
  methods: {
    save () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let resp
          if (this.title === '新增用户') {
            resp = await UserApi.create(this.userForm)
          } else {
            resp = await UserApi.update(this.userForm)
            this.userForm = {
              userName: null,
              password: null,
              orgName: null,
              orgNo: null
            }
          }
          if (resp.state === 1) {
            this.visible = false
            this.$emit('success', false)
            this.$message({
              message: resp.message,
              type: 'success'
            })
          } else {
            this.$emit('success', false)
            this.$message({
              message: resp.message,
              type: 'fail'
            })
          }
        }
      })
    },
    closeDialog () {
      this.$emit('success', false)
    }
  }
}
</script>
