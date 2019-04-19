const models = require('../models');
const Classes = models.Classes;

//添加一个教学班
exports.save = function(params,callback){
    let classes = new Classes(params);
    classes.save(callback);
}

//查询一个教学班,查询学生信息
exports.find = function(condition,callback){
    Classes.find(condition).populate('task_list').populate({
        path:'student_list',
        select:['student_number','_id'],
        ref:'Student'
    }).populate('belong_course').exec(callback);
}


//更新一个教学班的信息
exports.update = function(condition,update,callback){
    Classes.update(condition,update,callback);
}