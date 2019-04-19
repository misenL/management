<template>
	<div style="padding-top: 20px;padding-left:20px">
		<el-breadcrumb separator-class="el-icon-arrow-right">
	  	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  	  <el-breadcrumb-item><a href="/">{{course.course_name}}</a></el-breadcrumb-item>
	  	  <el-breadcrumb-item>{{classesInfo.classes_code}}</el-breadcrumb-item>
	  	</el-breadcrumb>

		<div style="width:100%;height: 100px;padding-top:30px;padding-right: 20px">
			<el-button type="warning" @click="dialogFormVisible = true">添加任务</el-button>
			<el-button type="success" @click="allStudentDialog = true" style="float: right;" circle>学</el-button>	
			<el-button type="danger" icon="el-icon-delete" style="float: right;" circle></el-button>
		</div>
		
		<!-- 添加任务弹出框 -->
		<el-dialog title="添加任务" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="任务名称">
		      <el-input v-model="form.task_name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="任务描述">
		       <el-input type="textarea" v-model="form.task_desc"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addTask">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 所有学生列表 -->
		<el-dialog title="班级学生列表" :visible.sync="allStudentDialog">
		  <el-table :data="studentList">
		  	<el-table-column property="student_number" label="学号"></el-table-column>
		    <el-table-column property="student_name" label="姓名"></el-table-column>
		  </el-table>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="allStudentDialog = false">取 消</el-button>
		  </div>
		</el-dialog>
		
		<div class="taskAlert" style="margin-bottom: 10px;">
			<el-alert
				title="任务列表"
				type="success"
				:closable="false">
			</el-alert>
		</div>

		<div v-if="classesInfo.task_list != '' ">
			<el-card class="box-card" shadow="hover" v-for="(task,index) in classesInfo.task_list" :key="index" style="width: 28%;margin-right: 5%;margin-bottom: 20px;float: left">
			  <div slot="header" class="clearfix">
			  	<router-link :to="'/teacher/task/' + task._id">
			    	<span>{{task.task_name}}</span>
			    </router-link>
			    <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close"></el-button>
			  </div>
			  <div class="text item">
			  	详情：{{task.task_desc}}
			  </div>
			</el-card>
		</div>

		<div v-if="classesInfo.task_list == ''">
			<el-alert
		    title="还没有任务!!"
		    type="warning"
		    description="该教学班下还没有任务哦!请点击上方添加按钮添加任务"
		    show-icon
		    :closable="false">
		  </el-alert>
		</div>
		
	</div>
</template>

<script>
	export default{
		inject:['reload'],
		data() {
	      return {
	        dialogFormVisible: false,
	        allStudentDialog:false,
	        form: {
	          task_name: '',
	          task_desc: ''
	        },
	        classesInfo:'',
	        studentList:'',
	        course:''
	      };
	    },
	    methods:{
	    	addTask(){
	    		let _this = this;
		        var url = '/task/createTask'
		        var params = new URLSearchParams();
		        params.append('task_name', _this.form.task_name);
		        params.append('task_desc', _this.form.task_desc); 
		        params.append('classesId', _this.$route.params.classes); 
		        _this.axios({
		            method: 'post',
		            url:url,
		            data:params
		        }).then((res)=>{
		        	if(res.data.status == 'ok'){
		          	 	_this.$message({
				          	message: '加入成功',
				         	type: 'success',
				         	onClose:function(){
				         		_this.reload();
				         	}
			        	});
		        	}else{
		        		_this.$message.error('加入失败');
		        	}
		        	_this.dialogFormVisible = false;
		        });
	    	},
	    	init(classesId){
	    		var _this = this;
		        _this.axios.get('/task/findClassesAllTask/' + classesId, {
		          params: {}
		        })
		        .then(function (response) {
		        	console.log("response",response);
		          _this.classesInfo = response.data.value;
		          _this.course = _this.classesInfo.belong_course;
		          //获取学生列表
		          _this.studentList = _this.classesInfo.student_list;
		        }).catch(function (err) {
		          console.log("err: " + err);
		        });
	    	},
	    	getStudentData(){

	    	}
	    },
	    mounted(){
	    	this.init(this.$route.params.classes);
	    },
	  	watch: {
		　　'$route': function (to, from) {
		        // 我这里还是用了Vuex，不过应该不影响理解
		        // 通过更新Vuex中的store的数据，让数据发生变化
		       this.init(this.$route.params.classes);
		　　}
		},
	}
</script>

<style scoped>
	
</style>