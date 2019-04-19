const models = require('../models');
const Student = models.Student;

//添加一个学生
exports.save = function(params,callback){
    let student = new Student(params);
    student.save(callback);
}

//查询一个学生,同时查询学生加入的教学班
exports.find = function(condition,callback){
    Student.find(condition,{"password":0}).populate({
        path:'join_clasess',
        select:['_id','classes_code','belong_course'],
        model:'Classes',
        populate:{
            path:'belong_course',
            select:['_id','course_name','course_code'],
            model:'Course'
        }
    }).exec(callback);
}

//查询一个学生，同时查询学生的相关信息,用户老师查看学生信息
exports.findStudentPublicInfo = function(condition,callback){
    Student.find(condition,{"password":0,"join_clasess":0}).exec(callback);
}

//查询学生信息
exports.findStudentPersonInfo = function(condition,callback){
    Student.find(condition,{"join_clasess":0}).exec(callback);
}

//更新一个学生
exports.update = function(condition,update,callback){
    Student.update(condition,update,callback);
}