<template>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        student() {
        const h = this.$createElement;
        this.$msgbox({
          title: '请输入学号，密码',
          message: h('p', null, [
            h('span', null, '学号：'),
            h('el-input', { style: 'color: teal' }),
            h('br'),
            h('span', null, '密码：'),
            h('el-input', { style: 'color: teal' })
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '登录中...';
              setTimeout(() => {//确认登录
              //验证
                this.$router.push('/student/student1'); 
                done();
              }, 1000);
            } else {
              this.$router.push('/');  
              done();
            }
          }
        }).then(action => {//信息弹框
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
    },
    mounted(){
    this.student();
}
}
</script>
<style>
#box{
    margin-top: 100px;
    text-align: center;
}
</style>