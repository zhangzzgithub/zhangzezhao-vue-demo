<template>
    <el-row style="height: 100%; ">
      <el-header class="el-header">VUE-DEMO</el-header>
       <el-col :span="4" style="font-family: '微软雅黑 Light';font-weight: bolder">
         <el-menu router :default-active="$route.path" >
           <el-menu-item index="manager"><i class="el-icon-menu"></i>首页</el-menu-item>
           <el-submenu index="2">
             <template slot="title"><i class="el-icon-edit"></i>用户管理</template>
             <el-menu-item index="user">用户列表</el-menu-item>
           </el-submenu>
           <el-submenu index="3">
             <template slot="title"><i class="el-icon-edit"></i>组织管理</template>
             <el-menu-item index="org">查询组织</el-menu-item>
             <el-menu-item index="orgtree">组织管理</el-menu-item>
           </el-submenu>
           <el-menu-item index="login">
             <i class="el-icon-close"></i>退出系统
           </el-menu-item>
         </el-menu>
       </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'manager'
}
</script>

<style  scoped>
  .el-header{
    font-size: 30px;
  }
</style>
