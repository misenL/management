const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    teacher_number:{
        type:String
    },
    teacher_name:{
        type:String
    },
    password:{
        type:String
    },
    course_list:[{type:String,ref:'Course'}]
});

const Teacher = mongoose.model('Teacher',TeacherSchema,'teacher');

module.exports = Teacher;