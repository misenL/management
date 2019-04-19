const models = require('../models');
const Course = models.Course;

//添加一门课程
exports.save = function(params,callback){
    let course = new Course(params);
    course.save(callback);
}

//查询一门课程
exports.find = function(condition,callback){
    Course.find(condition).exec(callback);
}

//查询基本信息
exports.findBaseInfo = function(condition,callback){
    Course.find(condition).exec(callback);
}

//更新一门课程
exports.update = function(condition,update,callback){
    Course.update(condition,update,callback);
}