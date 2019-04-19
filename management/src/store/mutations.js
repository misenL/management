const state = {
	teacher:null,
	student:null,
	windowHeight:''
}


const mutations = {
 	SETSTORAGE(state,payload){
 		state.teacher = payload;
 		localStorage.setItem('teacher',JSON.stringify(payload));
 	},
 	REMOVESTORAGE(state,payload){
 		state.teacher = null;
 		localStorage.removeItem('teacher');
 	},
 	SETSTUDENT(state,payload){
 		state.student = payload;
 		localStorage.setItem('student',JSON.stringify(payload));
 	},
 	REMOVESTUDENT(state,payload){
 		state.student = null;
 		localStorage.removeItem('student');
 	},
 	WINDOW_HEIGHT(state,payload){
 		state.windowHeight = document.documentElement.clientHeight;
 	}
}

export default{
  mutations,
  state
}

