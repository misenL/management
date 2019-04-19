<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="教师工号">
        <el-input v-model="teacher_number"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        teacher_number:'',
        password:''
      }
    },
    methods: {
      login() {
        let _this = this;
        var url = '/teacher/login'
        var params = new URLSearchParams();
        params.append('teacher_number', _this.teacher_number);
        params.append('password', _this.password); 
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
          if(res.data.status == 'ok'){
            _this.$store.dispatch('set_storage',{"_id":res.data.value._id,"name":res.data.value.teacher_name,"token":res.data.token});
            _this.$router.push('/teacher');
          }
        });
      }
    }
  }
</script>