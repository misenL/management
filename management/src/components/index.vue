<template>
	<div :style="{height: '640px',backgroundColor:'#efefef'}"> 
		<div id="container">
			<div style="width: 100%;height:100px;margin-left: 30%;" @click="teacher">
			<el-col :span="8">
			    <el-card shadow="hover">
			      教师登录
			    </el-card>
		  	</el-col>
		</div>
		<div style="width: 100%;height:100px;margin-left: 30%;"  @click="student">
			<el-col :span="8">
			    <el-card shadow="hover">
			      学生登录
			    </el-card>
	  		</el-col>
		</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		methods:{
			teacher(){
				this.$router.push('/teacher/login');
			},
			student(){
				this.$router.push('/student/login');
			}
		},
		mounted(){
		},
		computed:{
			windowHeight:function(){
				return this.$store.getters.getWindowHeight;
			}
		}
	}
</script>

<style scoped>
	#container{
		height: 200px;
		margin: 0 auto;
		text-align: center;
		padding-top: 15%;
	}
</style>