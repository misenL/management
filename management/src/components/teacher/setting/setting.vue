<template>
    <!-- 修改 -->
    <div style="padding-top: 20px;padding-left: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">个人设置</a></el-breadcrumb-item>
      </el-breadcrumb>
      <el-main>
        <div id="box">
          <span class="t">学号</span> 
          <input class="t" id="num" type="text" :value="number" readonly="true" style="border:none;text-align: center;"><br><br>
          <span class="t">姓名</span> 
          <input class="t" id="name" type="text" :value="name" :readonly="updateField" style="border:none;text-align: center;"><br><br>
          <span class="t">密码</span>
          <input class="t" id="psw" type="text" :value="password" :readonly="updateField" style="border:none;text-align: center;"><br><br>
          <el-button type="primary" round @click="updateFieldMethod()">修改</el-button>
          <el-button type="primary" :disabled="updateField" round @click="updateStudentInfo()">提交</el-button>
        </div>
      </el-main>
    </div>

</template>
<script>
  export default {
    data() {
      return {
        updateField:true,
        number:'',
        password:'',
        name:'',
      }
    },
    methods: {
      updateFieldMethod(){
        this.updateField= !this.updateField;
      },
      init(teacher_id){
        let _this = this;
        var url = '/teacher/findById'
        var params = new URLSearchParams();
        params.append('teacher_id', teacher_id);
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
          console.log("res",res);
          _this.number = res.data.value.teacher_number;
          _this.name = res.data.value.teacher_name;
          _this.password = res.data.value.password;
        });
      },
      updateStudentInfo(){
        let _this = this;
        var url = '/teacher/updateTeacherInfo'
        var params = new URLSearchParams();
        params.append('_id', _this.$route.params.teacher_id);
        params.append('student_name', _this.name);
        params.append('password', _this.password);
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
            if(res.data.status == "ok"){
              _this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success',
                onClose:function(){
                  _this.$router.go(0);
                }
              });
            }else{
              _this.$message({
                showClose: true,
                message: '修改失败',
                type: 'danger'
              });
            }          
        });
      }
    },
    mounted(){
      this.init(this.$route.params.teacher_id);
    }
  }
</script>
<style>
.t{
  font-size: 20px;
}
#box{
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
}
</style>
