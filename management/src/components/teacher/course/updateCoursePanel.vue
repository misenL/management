<template>
  <div style="padding-top: 20px;padding-left: 20px;">
  	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item><a href="/">课程修改</a></el-breadcrumb-item>
	  <el-breadcrumb-item>{{courseInfo.course_name}}</el-breadcrumb-item>
	</el-breadcrumb>
     <el-form ref="form" label-width="80px" style="padding-top:20px;">
    	<el-form-item label="课程代码">
    	<el-input v-model="course_code"></el-input>
    	</el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="course_name"></el-input>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="course_desc"></el-input>
        </el-form-item>
        	<el-button type="primary" @click="updateCourse">修改课程</el-button>
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
        course_desc:'',
        courseInfo:''
      }
    },
    methods: {
      updateCourse() {
        let _this = this;
        var url = '/teacher/course/updateCourse'
        var params = new URLSearchParams();
        params.append('courseId', _this.courseInfo._id);
        params.append('course_code', _this.course_code); 
        params.append('course_name', _this.course_name); 
        params.append('course_desc', _this.course_desc); 
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
          	if(res.data.status == 'ok'){
	           	_this.$message({
		          message: '修改成功',
		          type: 'success'
		        });
		        setTimeout(function(){
		        	window.location.reload();
		        },1000);
          	}else{
          		_this.$message.error('修改失败');
          	}
        });
      },
      init(courseId){
      	var _this = this;
        _this.axios.get('/teacher/course/updateCourse/' + courseId, {
          params: {}
        })
        .then(function (response) {
          console.log(response);
          _this.courseInfo = response.data.value;
          _this.course_code =  _this.courseInfo.course_code;
          _this.course_name =  _this.courseInfo.course_name;
          _this.course_desc =  _this.courseInfo.course_desc;
        }).catch(function (err) {
          console.log("err: " + err);
        });
      }
    },
    computed:{
    	user () {
        	return this.$store.getters.getStorage
      	}
    },
    mounted(){
    	let courseId = this.$route.params.courseId;
    	this.init(courseId);
    }
  }
</script>