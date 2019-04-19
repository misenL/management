<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="学号">
        <el-input v-model="student_number"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="student_name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="success" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        student_number:'',
        password:'',
        student_name:''
      }
    },
    methods: {
      login() {
        let _this = this;
        var url = '/student/login'
        var params = new URLSearchParams();
        params.append('student_number', _this.student_number);
        params.append('password', _this.password);
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
          console.log(res);
          if(res.data.status == 'ok'){
            _this.$store.dispatch('set_student',{"_id":res.data.value._id,"student_number":res.data.value.student_number,"token":res.data.token});
            _this.$router.push('/student');
          }
        });
      },
      register(){
        let _this = this;
        var url = '/student/register'
        var params = new URLSearchParams();
        params.append('student_number', _this.student_number);
        params.append('student_name', _this.student_name);
        params.append('password', _this.password); 
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
          console.log(res);
        });
      }
    }
  }
</script>