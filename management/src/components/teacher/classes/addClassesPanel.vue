<template>
  <div style="padding-top: 20px;padding-left: 20px;">
    <el-breadcrumb separator="/">
  	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  	  <el-breadcrumb-item><a href="/">{{courseInfo.course_name}}</a></el-breadcrumb-item>
  	  <el-breadcrumb-item>添加教学班</el-breadcrumb-item>
  	</el-breadcrumb>
    <el-form ref="form" label-width="100px" style="padding-top:20px;">
    	<el-form-item label="教学班代码">
    	<el-input v-model="classes_code"></el-input>
    	</el-form-item>
        <el-form-item label="教学班描述">
          <el-input v-model="classes_desc"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addClasses" style="margin: 0 auto">添加教学班</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        classes_code:'',
        classes_desc:'',
        courseInfo:''
      }
    },
    methods: {
      //为课程添加教学班
      addClasses() {
        let _this = this;
        var url = '/classes/saveClasses'
        //课程id
        let courseId = _this.$route.params.courseId;
        console.log(courseId);
        var params = new URLSearchParams();
        params.append('classes_code', _this.classes_code);
        params.append('classes_desc', _this.classes_desc); 
        //课程Id
        params.append('courseId', courseId); 
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
           if(res.data.status == "ok"){
		        _this.$message({
		          message: '添加教学班成功',
		          type: 'success'
		        });
		        setTimeout(function(){
		        	window.location.reload();
		        },1000);
           }else{
           	_this.$message.error('添加教学班失败');
           }
        });
      },
      init(courseId){
        var _this = this;
        _this.axios.get('/teacher/course/baseInfo/' + courseId, {
          params: {}
        })
        .then(function (response) {
         _this.courseInfo = response.data.value;
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
      this.init(this.$route.params.courseId);
    }
  }
</script>