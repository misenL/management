<template>
	<div style="padding-top: 20px;padding-left: 20px;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{classes.classes_code}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{baseInfo.task_name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="showUpload">
      <div style="margin-top: 30px;float: left">
          <el-upload
          class="upload-demo"
          action="http://localhost:3030/task/uploadHomeWork"
          :limit="1"
          :data="taskId"
          :on-success="success">
          <el-button size="small" type="primary">上传作业<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
    </div>
    <div style="float: right;padding-top:20px;margin-left: 30px;margin-right: 10px">
       <el-button type="danger" plain @click="commit">未提交</el-button>
    </div>
    </div>
     <div style="float: left;padding-top:20px;margin-right: 10px" v-if="!showUpload">
       <el-button type="danger" plain disabled>已提交</el-button>
    </div>


		<!-- 已经上传的列表 -->
		<el-table
	      :data="file_list"
	      style="width: 100%">
	      <el-table-column
	        prop="file_url"
	        label="文件名"
	        >
	      </el-table-column>
	      <el-table-column
	        prop="post_time"
	        label="提交日期"
	       >
	      </el-table-column>
	      <el-table-column
	        prop="uploader.student_number"
	        label="提交人">
	      </el-table-column>
	    </el-table>

      <!-- 学生的所有上传的列表 -->
      <el-dialog title="选择需要保留的文件" :visible.sync="showStudentCommitFiles">
      <el-table :data="student_upload_file" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column property="task_files.file_url" label="文件名"></el-table-column>
        <el-table-column property="task_files.post_time" label="提交时间"></el-table-column>
      </el-table>
       <div slot="footer" class="dialog-footer">
      <el-button @click="showStudentCommitFiles = false">取 消</el-button>
      <el-button type="primary" @click="comfirmPost">确 定</el-button>
    </div>
    </el-dialog>
	</div>
</template>

<script>
	 export default {
    data() {
      return {
        //所有上传的文档
      	file_list:[],
        //学生在当前任务下上传的文档
        student_upload_file:[],
        showStudentCommitFiles:false,
        chooseUploadItem:'',
        showUpload:true,
        baseInfo:'',
        classes:''
      }
    },
    methods: {
      success(response, file, fileList) {
        let _this = this;
      	if(response.status == "ok"){
      		this.$message({
		    	message: '上传成功',
		    	type: 'success',
          onClose:function(){
            _this.$router.go(0);
          }
		    });
      	}
      },
      init(taskId){
    	  var _this = this;
      	_this.axios.get('/task/findTaskAllFile/' + taskId, {
        	params: {}
      	})
      	.then(function (response) {
          console.log("response",response);
          _this.baseInfo = response.data.value;
          _this.classes = response.data.value.belong_classes;
          for(let i = 0; i < response.data.value.task_files.length; i++){
            response.data.value.task_files[i].file_url = response.data.value.task_files[i].file_url.split('upload/')[1];
          }
        	_this.file_list = response.data.value.task_files;
          //判断当前用户是否已经提交
          let userId  = _this.$store.getters.getStudent._id;
          for(let j = 0; j < _this.file_list.length; j++){
            if(_this.file_list[j].uploader._id == userId && _this.file_list[j].is_Commit){
              _this.showUpload = false;
            }
          }
      	}).catch(function (err) {
        	console.log("err: " + err);
      	});
      },
      dateFormat(time){
      	var date = new Date(time);
      	return date.getYear() + '-' + date.getMonth()+1 + '-' + date.getDate();
      },
      commit(){
        //点击完成的时候查询该任务下的用户的所有提交，如果有多次提交，选择最终版本
        var _this = this;
        _this.axios.get('/student/commitTask/' + _this.$store.getters.getStudent._id, {
          params: {}
        })
        .then(function (response) {
          console.log(response);
          
         _this.student_upload_file = response.data.value;
         console.log("_this.student_upload_file",_this.student_upload_file);
         if(_this.student_upload_file.length <= 0 || _this.file_list.length <= 0){
            _this.$message.error('你还没有上传过作业');
         }else if(_this.student_upload_file.length > 1){
          _this.showStudentCommitFiles = true;
         }else{
            _this.$confirm('确定提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
         }
        }).catch(function (err) {
          console.log("err: " + err);
        });
      },
      handleCurrentChange(val){
        this.chooseUploadItem = val.task_files._id;
      },
      comfirmPost(){
        let _this = this;
        //学生id
        let studentId = _this.$store.getters.getStudent._id;
        let task_Id = _this.$route.params.taskId;
        //确定的文件id
        let confirmFileId = _this.chooseUploadItem;
        var url = '/student/removeByUploadStudentId'
        var params = new URLSearchParams();
        params.append('studentId', studentId);
        params.append('fileId', confirmFileId); 
        params.append('taskId', task_Id); 
        _this.axios({
            method: 'post',
            url:url,
            data:params
        }).then((res)=>{
           if(res.data.status == "ok"){
              _this.$message({
              message: '提交成功',
              type: 'success',
              onClose:function(){
                _this.$router.go(0);
              }
            });
           }else{
              _this.$message({
              message: '提交失败',
              type: 'danger'
            });
           }

        });
      }
    },
    computed:{
    	taskId(){
    		return {taskId:this.$route.params.taskId,studentId:this.$store.getters.getStudent._id};
    	}
    },
    mounted(){
    	this.init(this.$route.params.taskId);
    }
  }
</script>

<style scoped>
	
</style>