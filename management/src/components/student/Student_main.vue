<template>
<el-container style="height: 700px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-date"></i>加入的教学班</template>
        
        <el-menu-item-group v-for="(classes,index) in studentInfo.join_clasess" :key="index">
          <router-link :to="'/student/allTask/' + classes._id">
            <el-menu-item :index="index + classes">{{classes.classes_code}}({{classes.belong_course.course_name}})</el-menu-item>
          </router-link>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-edit-outline"></i>作业</template>
        <el-menu-item-group>

        <el-submenu index="2-1">
          <template slot="title">未完成</template>
          <el-menu-item index="2-1-1">WWW</el-menu-item>
        </el-submenu>
        </el-menu-item-group>

        <el-menu-item-group>
        <el-submenu index="2-2">
          <template slot="title">完成</template>
          <el-menu-item index="2-2-1">CCC</el-menu-item>
        </el-submenu>
        </el-menu-item-group>

      </el-submenu>
        <el-menu-item-group>
          <router-link :to="'/student/studentInfo/' + student._id">
          <el-menu-item index="3">
            <i class="el-icon-message"></i>
            <el-badge class="item">个人设置</el-badge>
          </el-menu-item>
        </router-link>
        </el-menu-item-group>

    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-input placeholder="输入老师姓名" v-model="teacher_name" style="width: 300px;"></el-input>
      <router-link :to="'/student/search/' + teacher_name">
        <el-button type="primary">查询</el-button>
      </router-link>
      <span @click="open3()">{{student.student_number}}</span>
    </el-header>
    
    <router-view v-if="isRouterAlive"></router-view>
  </el-container>

</el-container>  
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        teacher_name:'',
        formLabelWidth: '120px',
        studentInfo:'',
        isRouterAlive:true
      }
    },
    methods: {
      search(){
        var _this = this;
        _this.axios.get('/student/getByTeacherName/' + _this.teacher_name, {
          params: {}
        })
        .then(function (response) {
          console.log(response);
        }).catch(function (err) {
          console.log("err: " + err);
        });
      },
      init(studentId){
          var _this = this;
          _this.axios.get('/student/index/' + studentId, {
            params: {}
          })
          .then(function (response) {
            _this.studentInfo = response.data.value;
            // _this.teachers = response.data.value;
          }).catch(function (err) {
            console.log("err: " + err);
          });
      },
      formatter(row, column) {
        return row.address;
      },
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true;
        });
      }
    },
    computed: {
      student () {
        return this.$store.getters.getStudent
      }
    },
    mounted(){
      this.init(this.student._id);
    },
    provide(){
      return{
        reload: this.reload
      }
    },
    watch: {
      "$route": "reload"
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>