// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import store from './store/store.js'



Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

//axios配置
Vue.prototype.baseUrl = "http://localhost:3030"
axios.defaults.baseURL = 'http://localhost:3030/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 5000;

Vue.prototype.dateformat = function(date){
	let  convertDate = new Date(date);
	let year = convertDate.getFullYear();
	let month = convertDate.getMonth() + 1;
	let day = convertDate.getDate();

	return year + '-' + month + '-' + day;
}


router.beforeEach( (to, from, next) => {
	let toPath = to.fullPath;
	//教师拦截
	if(toPath.indexOf('teacher') > -1){
		if(toPath.indexOf('login') > -1){
			next();
		}else{
			//访问的是其他节点
			if(localStorage.getItem('teacher') != null){
				next();
			}else{
				router.push('/');
			}
		}
	}
	

	if(toPath.indexOf('student') > -1){
		if(toPath.indexOf('login') > -1){
			next();
		}else{
			//访问的是其他节点
			if(localStorage.getItem('student') != null){
				next();
			}else{
				router.push('/');
			}
		}
	}

	next();

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
