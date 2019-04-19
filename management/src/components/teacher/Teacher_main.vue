<template>
  <el-container style="height: 1000px; border: 1px solid #eee">
    <!-- 最左侧 -->
    <el-container
      id="MaxLeft"
      direction='vertical' style="background-color: rgb(84, 92, 100);border-right: 1px solid #666">
      <router-link to="/teacher">
        <div><img src="/static/classes.png" alt="标签" class="Sidebar" srcset=""></div>
      </router-link>
      
      <router-link :to="'/teacher/setting/' + teacher._id">
          <div><img src="/static/setting.png" alt="设置" class="Sidebar" srcset=""></div>
      </router-link>
    </el-container>


      <!-- 左侧中间导航 -->
    <el-aside width="14%" style="background-color: rgb(84, 92, 100); min-width: 200px">
      <el-menu  background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu :index="index + course" v-for ="(course,index) in courses" :key="index">
          <template slot="title">
            <i class="el-icon-menu"></i><span>{{course.course_name}}</span>
          </template>
          <el-menu-item-group>
            <router-link :to="'/teacher/' + classes._id + '/taskes'" v-for="(classes,classesIndex) in course.classes_list" :key="classesIndex">
              <el-menu-item :index="classes._id"  > 教学班：{{classes.classes_code}}</el-menu-item>
            </router-link>
            <!-- 课程操作 -->
            <div class="operate" style="text-align:center">
              <router-link  :to="'/teacher/classes/add/'+ course._id">
             <el-button
              icon="el-icon-plus"
              size="small" plain style="margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;添加教学班</el-button>
            </router-link>
            <router-link :to="'/teacher/updateCourse/' + course._id">
              <el-button type="success" icon="el-icon-edit" size="small" plain>修改课程信息</el-button>
            </router-link>
            </div>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

      <!-- 右侧头部内容 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px;background-color: rgb(84, 92, 100);">
          <router-link to="/teacher/addCoursePanel">
            <el-button
            id="addTo"
            class="el-icon-plus"
            >&nbsp;&nbsp;&nbsp;添加课程
            </el-button>
          </router-link>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="margin-left:40px;color:#fff">
              {{teacher.teacher_name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-header>
      <!-- 中间路由 -->
      <router-view v-if="isRouterAlive"></router-view>
    </el-container>
  </el-container>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'Main_interface',
    components: {

    },
    data () {
        return {
          teacher:'',
          courses:'',
          isRouterAlive:true
        }
    },
    computed: {
      user () {
        return this.$store.getters.getTeacher
      }
    },
    methods: {
      init(id){
        var _this = this;
        _this.axios.get('/teacher/' + id, {
          params: {}
        })
        .then(function (response) {
          _this.teacher = response.data.value;
          _this.courses = response.data.value.course_list;
        }).catch(function (err) {
          console.log("err: " + err);
        });
      },
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true;
        });
      },
      logout(){
        console.log(111);
        this.$store.actions.removeStorage();
        location.removeItem('teacher');
        this.$router.go(0);
      },
      handleCommand(command) {
        this.$store.dispatch('removeStorage');
        localStorage.removeItem('teacher');
        this.$router.go(0);
      }
    },
    mounted(){
      //获取窗口高度
      //
      this.init(this.user._id);
    },
    provide(){
      return{
        reload: this.reload
      }
    }
}
</script>


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
