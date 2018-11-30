<template>
  <el-form :model="account" ref='form' class="formStyle">
    <h3 class="title">登录</h3>
    <el-form-item prop="userName">
      <el-input v-model="account.userName" class="inputStyle" type="text"  placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="account.password" class="inputStyle" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="Login" type="primary" class="buttonStyle" >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UserApi from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      account: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },

  methods: {
    Login () {
      if (this.account.userName === '') {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        })
        return
      }
      if (this.account.password === '') {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return
      }
      // 将提交的数据进行封装
      let loginParams = {userName: this.account.userName, password: this.account.password}
      // 调用函数  传递参数 获取结果
      UserApi.requestLogin(loginParams).then(data => {
        console.log(data)
        if (data.code === null) {
          // 登录成功
          // 跳转到后台主界面
          sessionStorage.setItem('userName', data.data)
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          this.$router.push({path: '/manager'})
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .inputStyle{
    width: 500px
  }
  .buttonStyle{
    width:70px;
  }
  .formStyle{
    text-align: center
  }
</style>
