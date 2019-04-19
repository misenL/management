const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task_name:{
        type:String
    },
    task_desc:{
        type:String
    },
    task_files:[{
        file_url:String,
        uploader:{
            type:String,
            ref:'Student'
        },
        post_time:{
            type:Date
        },
        is_Commit:{
            type:Boolean
        }
    }],
    already_post:[{type:String,ref:'Student'}],
    //属于的班级
    belong_classes:{
        type:String,
        ref:'Classes'
    }
});

const Task = mongoose.model('Task',TaskSchema,'task');

module.exports = Task;