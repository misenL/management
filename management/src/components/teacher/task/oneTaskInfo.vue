<template>
	<div style="padding-top: 20px;padding-left:20px">
		<el-breadcrumb separator-class="el-icon-arrow-right">
	  	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  	  <el-breadcrumb-item><a href="/">Java面向对象</a></el-breadcrumb-item>
	  	  <el-breadcrumb-item>第一周</el-breadcrumb-item>
	  	</el-breadcrumb>

		<div style="width:100%;height: 100px;padding-top:30px;padding-right: 20px">
			<el-button type="success" circle @click="alreayCommit">已</el-button>	
			<el-button type="danger" circle @click="unCommit">未</el-button>
		</div>	
		
		<!-- 提交的文件表格，可见 -->
		<el-table
	      :data="fileList"
	      style="width: 100%">
	      <el-table-column
	        prop="file_url"
	        label="文件">
	      </el-table-column>
	      <el-table-column
	        prop="post_time"
	        label="提交时间">
	      </el-table-column>
	      <el-table-column
	        prop="uploader.student_number"
	        label="提交人">
	      </el-table-column>
	      <el-table-column
	        prop="is_Commit"
	        label="最终提交?">
	      </el-table-column>
	      <el-table-column label="操作">
		      <template slot-scope="scope">
		        <a :href="'http://localhost:3030/task/download/' + scope.row.file_url">
		        	<el-button type="danger" size="mini">下载</el-button>
		        </a>
		      </template>
	      </el-table-column>
	    </el-table>

		
	    <!-- 弹出已交学生名单的表格 -->
	    <el-dialog title="已交学生" :visible.sync="alreayCommitStatus">
			<el-table
		    :data="alreayCommitUserList"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="student_number"
		      label="学号">
		    </el-table-column>
		    <el-table-column
		      prop="_id"
		      label="姓名">
		    </el-table-column>
		  </el-table>
		</el-dialog>

		<el-dialog title="未交学生" :visible.sync="unCommitStatus">
			<el-table
		    :data="unCommitUserList"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="student_number"
		      label="学号">
		    </el-table-column>
		    <el-table-column
		      prop="_id"
		      label="姓名">
		    </el-table-column>
		  </el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				fileList:[],
				alreayCommitStatus:false,
				unCommitStatus:false,
				alreayCommitUserList:[],
				belong_classes:'',
				unCommitUserList:[]
			}
		},
		methods:{
			init(taskId){
				var _this = this;
		        _this.axios.get('/task/findTaskAllFile/' + taskId, {
		          params: {}
		        })
		        .then(function (response) {
		          console.log(response);
		          for(let i = 0; i < response.data.value.task_files.length; i++){
		          	response.data.value.task_files[i].downloadUrl = _this.baseUrl + '/' +  response.data.value.task_files[i].file_url;
		            response.data.value.task_files[i].file_url = response.data.value.task_files[i].file_url.split('upload/')[1];
		            response.data.value.task_files[i].post_time = _this.dateformat(response.data.value.task_files[i].post_time); 
		             response.data.value.task_files[i].is_Commit?response.data.value.task_files[i].is_Commit="是":response.data.value.task_files[i].is_Commit="否"
		          }
		          _this.fileList = response.data.value.task_files;
		          _this.belong_classes = response.data.value.belong_classes;
		        }).catch(function (err) {
		          console.log("err: " + err);
		        });
			},
			alreayCommit(){
				var _this = this;
				_this.alreayCommitStatus = true;
				let taskId = this.$route.params.taskId
		        _this.axios.get('/task/alreayCommit/' + taskId, {
		          params: {}
		        })
		        .then(function (response) {
		          console.log(response);
		          _this.alreayCommitUserList = response.data.value;
		        }).catch(function (err) {
		          console.log("err: " + err);
		        });
			},
			unCommit(){
				let _this = this;
				_this.unCommitStatus = true;
				let taskId = _this.$route.params.taskId;
				_this.axios.get('/task/unCommit/' + taskId + '/' + _this.belong_classes, {
		          params: {}
		        })
		        .then(function (response) {
		          console.log(response);
		          _this.unCommitUserList = response.data.unCommit;
		        }).catch(function (err) {
		          console.log("err: " + err);
		        });
			}
		},
		mounted(){
			this.init(this.$route.params.taskId);
		}
	}
</script>

<style scoped>
	
</style>