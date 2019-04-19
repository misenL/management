const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    student_number:{
        type:String
    },
    student_name:{
        type:String
    },
    password:{
        type:String
    },
    //加入的教学班
    join_clasess:[{type:String,ref:'Classes'}]
});

const Student = mongoose.model('Student',StudentSchema,'student');

module.exports = Student;