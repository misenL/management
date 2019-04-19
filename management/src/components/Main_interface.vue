<template>
  <el-container style="height: 800px; border: 1px solid #eee">
      <!-- 最左侧 -->
      <el-container
        id="MaxLeft"
        direction='vertical'>
        <div><img src="../assets/logo_1.png" alt="标签" class="Sidebar" srcset=""></div>
        <div><img src="../assets/logo_1.png" alt="标签" class="Sidebar" srcset=""></div>
          <i class="Sidebar"> <img src="../assets/logo_1.png" alt="设置" srcset=""> </i>
      </el-container>
      <!-- 左侧中间导航 -->
    <el-aside width=14% style="background-color: rgb(238, 241, 246); min-width: 200px">
      <el-menu>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i><span>马克思主义与毛泽东思想</span></template>
          <el-menu-item-group>
            <router-link to="/Main_interface/studentPanel"><el-menu-item index="1-1">教学班：AJS</el-menu-item></router-link>
            <router-link to="/Main_interface/taskPanel"><el-menu-item index="1-2">教学班：SG</el-menu-item></router-link>
            <el-menu-item index="1-3">教学班：GH</el-menu-item>
            <el-menu-item index="1-4">教学班：MM</el-menu-item>
            <el-button
              id="addToJXB"
              class="el-icon-plus"
              @click="">&nbsp;&nbsp;&nbsp;添加教学班</el-button>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i><span>这是一门好课程</span></template>
          <el-menu-item-group>
            <router-link to="/Main_interface/studentPanel"><el-menu-item index="2-1">教学班：AJS</el-menu-item></router-link>
            <router-link to="/Main_interface/taskPanel"><el-menu-item index="2-2">教学班：SG</el-menu-item></router-link>
            <el-menu-item index="3-3">教学班：GH</el-menu-item>
            <el-menu-item index="4-4">教学班：MM</el-menu-item>
            <el-button
              id="addToJXB"
              class="el-icon-plus"
              @click="">&nbsp;&nbsp;&nbsp;添加教学班</el-button>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i><span>这个长度差不多了</span></template>
          <el-menu-item-group>
            <router-link to="/Main_interface/studentPanel"><el-menu-item index="3-1">教学班：AJS</el-menu-item></router-link>
            <router-link to="/Main_interface/taskPanel"><el-menu-item index="3-2">教学班：SG</el-menu-item></router-link>
            <el-menu-item index="3-3">教学班：GH</el-menu-item>
            <el-menu-item index="3-4">教学班：MM</el-menu-item>
            <el-button
              id="addToJXB"
              class="el-icon-plus"
              @click="">&nbsp;&nbsp;&nbsp;添加教学班</el-button>
          </el-menu-item-group>
        </el-submenu>

        <el-button
          id="addTo"
          class="el-icon-plus"
          @click="">&nbsp;&nbsp;&nbsp;添加课程</el-button>

      </el-menu>
    </el-aside>
    <!-- 右侧头部内容 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu trigger="click" slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <span style="margin-right:3%">王小虎</span>
      </el-header>
      <!-- 中间路由 -->
      <router-view></router-view>

    </el-container>
  </el-container>
  
</template>


<style>
#MaxLeft {
    background-color: #B3C0D1;
    width: 50px;
    max-width: 50px;
    padding-top: 10px;
}
#addTo {
  margin-left: 2px;
}
#addToJXB {
  width: 122px;
  height: 30px;
  margin-left: 40px;
  padding: 5px;
  background-color:blanchedalmond;
}
.el-icon-setting::before {
  width: 40px;
  height: 40px;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}  
.el-aside {
    color: #333;
}
.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0;
    min-width: 200px;
}
.el-submenu__title span {
  display:inline-block;
  white-space:pre-wrap;
  width: 75%;
  min-width: 100px;
  line-height: 15px;
}
.Sidebar {
  margin: 5px 5px 5px 5px;
}
img {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>

<script>
export default {
    name: 'Main_interface',
    components: {

    },
    data () {
        return {

        }
    },

    computed: {},
    methods: {

    }
}
</script>
