<template>
    <!-- 修改 -->
<el-main>
<div id="box">
<span class="t">学号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
<input class="t" id="num" type="text" :value="number" readonly="true" style="border:none;text-align: center;"><br><br>

<span class="t">密码</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input class="t" id="psw" type="text" :value="password" :readonly="mdf" style="border:none;text-align: center;"><br><br>
<el-button type="primary" round @click="MDF()">修改</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<el-button type="primary" :disabled="mdf" round>提交</el-button>
</div>
</el-main>
</template>
<script>
  export default {
    data() {
      return {
        mdf:true,
        number:'1540624121',
        password:'9527'
      }
    },
    methods: {
      MDF(){
        if(this.mdf==true){
        this.mdf=false;
        // document.getElementById("num").style="border:1px,solid";
        document.getElementById("psw").style="border:1px,solid;text-align: center;";
        }else if(this.mdf==false){
        this.mdf=true;
        // document.getElementById("num").style="border:none;";
        document.getElementById("psw").style="border:none;text-align: center;";
        }

      }
    }
  }
</script>
<style>
.t{
  font-size: 20px;
}
#box{
  margin: 0 auto;
  text-align: center;
}
</style>
