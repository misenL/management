const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    classes_code:{
        type:String
    },
    classes_desc:{
        type:String
    },
    belong_course:{
        type:String,
        ref:'Course'
    },
    create_time:{type:Date},
    student_list:[{type:String,ref:'Student'}],
    task_list:[{type:String,ref:'Task'}],

});

const Classes = mongoose.model('Classes',ClassesSchema,'classes');

module.exports = Classes;