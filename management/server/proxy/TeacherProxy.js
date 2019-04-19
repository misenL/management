const models = require('../models');
const Teacher = models.Teacher;

//保存一条教师信息
exports.save = function(params,callback){
    let teacher = new Teacher(params);
    teacher.save(callback);
}

//查询教师信息
exports.find = function(condition,callback){
    Teacher.find(condition,{"password":0}).populate({
        path:'course_list',
        select: '_id course_code course_name course_desc classes_list',
        model: 'Course',
        populate: {
            path: 'classes_list',
            select: '_id classes_code classes_name classes_desc',
            model: 'Classes'
        }
    }).exec(callback);
}

//根据id查询教师信息
exports.findById = function(_id,callback){
    Teacher.findById(_id,{"course_list":0}).exec(callback);
}

//修改老师信息
exports.update = function(condition,update,callback){
    Teacher.update(condition,update,callback);
}