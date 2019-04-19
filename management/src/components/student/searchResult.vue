<template>
	<div style="padding-top: 20px;padding-left:20px">
		<el-card class="box-card" v-for="(teacher,i) in teachers" :key="i" v-if="teachers != ''">
		  <div slot="header" class="clearfix">
		    <span>{{teacher.teacher_name}}</span>
		  </div>
		  <div v-for="(course,index) in teacher.course_list" :key="index" class="text item">
		    {{course.course_name}}
			<el-button @click="setDialog(course.classes_list)">查看教学班</el-button>
		  </div>
		</el-card>

		<el-dialog title="该课程的教学班" :visible.sync="dialogVisible">
		  <el-table :data="classesList">
		    <el-table-column property="classes_code" label="教学班代码" ></el-table-column>
		    <el-table-column property="classes_desc" label="教学班描述"></el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="success"
		          @click="joinClasess(scope.row._id)" v-if="studentJoinClassesIdList.indexOf(scope.row._id) < 0 ">加入教学班</el-button>

		          <el-button
		          size="mini"
		          type="danger"
		          @click="joinClasess(scope.row._id)" v-if="studentJoinClassesIdList.indexOf(scope.row._id) > -1 ">退出教学班</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-dialog>
	</div>
</template>
<script>
  export default {
    data() {
      return {
      	teachers:'',
      	classesList:'',
      	dialogVisible:false,
      	studentJoinClasses:'',
      	studentJoinClassesIdList:[]
      }
    },
    methods: {
    	init(word){
    		var _this = this;
    		let studentId = _this.student._id;
	        _this.axios.get('/student/getByTeacherName/' + word + '/' + studentId, {
	          params: {}
	        })
	        .then(function (response) {
	          console.log(response);
	          _this.teachers = response.data.teacher;
	          _this.studentJoinClasses = response.data.student.join_clasess;
	          for(let n = 0; n < _this.studentJoinClasses.length; n++){
	          	_this.studentJoinClassesIdList.push(_this.studentJoinClasses[n]._id);
	          }
	          //判断当前学生是否有加入该教学班
	          /*for(let i = 0; i < response.data.teacher.length; i++){
	          	for(let j = 0; j < response.data.teacher[i].course_list.length; j++){
	          		for(let k = 0; k < response.data.teacher[i].course_list[j].classes_list.length; k++){
	          			for(let m = 0; m < _this.studentJoinClasses.length; m++){
	          				if(_this.studentJoinClasses[m]._id == response.data.teacher[i].course_list[j].classes_list[k]._id){
	          					response.data.teacher[i].course_list[j].classes_list[k].isJoin = true;
	          				}else{
	          					response.data.teacher[i].course_list[j].classes_list[k].isJoin = false;
	          				}
	          			}
	          			// if(.indexOf(response.data.teacher[i].course_list[j].classes_list[k].classes_code)){}
	          		}
	          	}*/
	          // }
	          
	        }).catch(function (err) {
	          console.log("err: " + err);
	        });
    	},
    	setDialog(content){
    		this.dialogVisible = true;
    		this.classesList = content;
    	},
    	joinClasess(id){
    		//学生id
    		let _this = this;
    		let studentId = _this.student._id;

    		var url = '/student/joinClasses'
	        var params = new URLSearchParams();
	        params.append('classesId', id);
	        params.append('studentId', studentId);
	        _this.axios({
	            method: 'post',
	            url:url,
	            data:params
	        }).then((res)=>{
	          console.log(res);
	          if(res.data.status == 'ok'){
	           	 _this.$message({
		          message: '加入成功',
		          type: 'success'
		        });

	           	setTimeout(function(){
	           		window.location.reload();
	           	},1000);
	          }else{
	          	_this.$message.error('加入失败');
	          }
	        });
    	}
    },
    mounted(){
    	this.init(this.$route.params.value);
    },
    computed:{
    	student () {
        	return this.$store.getters.getStudent
      	}
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>