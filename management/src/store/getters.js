export default{
    getTeacher:(state)=>{
    	if(!state.mutations.teacher){
    		state.mutations.teacher = JSON.parse(localStorage.getItem('teacher'));
    	}
    	return state.mutations.teacher;
    },
    getStudent:(state)=>{
    	if(!state.mutations.student){
    		state.mutations.student = JSON.parse(localStorage.getItem('student'));
    	}
    	return state.mutations.student;
    },
    getWindowHeight:(state)=>{
        if(!state.mutations.windowHeight){
            state.mutations.windowHeight = document.documentElement.clientHeight;
        }
        return state.mutations.windowHeight;
    }
}