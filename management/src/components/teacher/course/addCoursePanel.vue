<template>
  <div style="padding-top: 10px;padding-left: 10px;">
    <el-form ref="form" label-width="80px">
    	<el-form-item label="课程代码">
    	<el-input v-model="course_code"></el-input>
    	</el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="course_name"></el-input>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="course_desc"></el-input>
        </el-form-item style="text-align:center">
        <el-button type="primary" @click="addCourse" style="text-align:center">添加课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        course_code:'',
        course_name:'',
        course_desc:''
      }
    },
    methods: {
      addCourse() {
        let _this = this;
        var url = '/teacher/course/saveCourse'
        var params = new URLSearchParams();
        params.append('course_code', _this.course_code);
        params.append('course_name', _this.course_name); 
        params.append('course_desc', _this.course_desc); 
        params.append('teacher_id', _this.user._id); 
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
           if(res.data.status == "ok"){
           	alert('添加成功');
           }else{
           	alert('添加失败');
           }
        });
      }
    },
    computed:{
    	user () {
        	return this.$store.getters.getStorage
      	}
    }
  }
</script>