const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//课程表
//课程代码
//课程名称
const CourseSchema = new Schema({
    course_code:{
        type:String
    },
    course_name:{
        type:String
    },
    course_desc:{
        type:String
    },
    create_time:{type:Date},
    classes_list:[{type:String,ref:'Classes'}]
});

const Course = mongoose.model('Course',CourseSchema,'course');

module.exports = Course;