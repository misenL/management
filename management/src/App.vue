<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){

  },
  data(){
    return{
    }
  },
  methods:{
    setLoginStatus(){
      //获取localStorage中信息
        let teacher = JSON.parse(localStorage.getItem('teacher'));
        let student = JSON.parse(localStorage.getItem('student'));
        this.$store.dispatch("set_storage",teacher);
        this.$store.dispatch("set_student",student);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
a:link {
  color: #2c3e50;
	text-decoration: none;
}
a:visited {
  color: #2c3e50;
	text-decoration: none;
}
a:hover {
  color:tomato;
  font-size: 16px;
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
</style>
