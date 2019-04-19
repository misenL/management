export default{
  set_storage:({commit},payload)=>{
  	commit('SETSTORAGE',payload);
  },
  removeStorage:({commit},payload)=>{
  	commit('REMOVESTORAGE',payload);
  },
   set_student:({commit},payload)=>{
  	commit('SETSTUDENT',payload);
  },
  remove_student:({commit},payload)=>{
  	commit('REMOVESTUDENT',payload);
  },
}
