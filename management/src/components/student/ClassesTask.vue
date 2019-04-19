<template>
	<div style="padding-top: 20px;padding-left: 20px;">
	<el-breadcrumb separator="/">
  	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  	  <el-breadcrumb-item>{{courseInfo.course_name}}</el-breadcrumb-item>
  	  <el-breadcrumb-item>{{classesInfo.classes_code}}</el-breadcrumb-item>
  	</el-breadcrumb>
	
	<div class="taskAlert" style="margin-bottom: 10px;">
			<el-alert
				title="任务列表"
				type="success"
				:closable="false">
			</el-alert>
	</div>

	<div v-if="classesInfo.task_list == ''">
		<el-alert
	    title="还没有任务!!"
	    type="warning"
	    description="老师还没有发布过任务哦！"
	    show-icon
	    :closable="false">
	  </el-alert>
	</div>

	<div style="margin-top: 20px;" v-if="classesInfo.task_list != ''">
		<router-link :to="'/student/homeWorkUploadPanel/' + task._id" v-for="(task,index) in classesInfo.task_list" :key="index" >
			<el-card class="box-card" shadow="hover" style="width: 25%;margin-right: 5%;margin-bottom: 20px;float: left" >
			  <div slot="header" class="clearfix">
			  	
			    <span>{{task.task_name}}</span>
			     
			  </div>
			  <div class="text item">
			  	<span style="color:red;margin-right: 10px">说明：</span>{{task.task_desc}}
			  </div>
			</el-card>
		</router-link>
	</div>
		
	</div>
</template>


<script>
	export default{
		data(){
			return{
				classesInfo:'',
				courseInfo:''
			}
		},
		methods:{
			init(classesId){
	    		var _this = this;
		        _this.axios.get('/task/findClassesAllTask/' + classesId, {
		          params: {}
		        })
		        .then(function (response) {
		          console.log("response",response);
		          _this.classesInfo = response.data.value;
		          _this.courseInfo = _this.classesInfo.belong_course;
		        }).catch(function (err) {
		          console.log("err: " + err);
		        });
	    	}
		},
		mounted(){
			this.init(this.$route.params.classesId);
		}
	}
</script>

<style scoped>
	.taskAlert{
		margin-top:20px;
	}
</style>