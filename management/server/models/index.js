const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homework_manage_db',{
    server: {poolSize: 20}
},(err)=>{
    if(err){
        console.log("数据库连接失败!");
    }else{
        console.log("数据库连接成功!");
    }
});

exports.Classes = require('./Classes');
exports.Student = require('./Student');
exports.Teacher = require('./Teacher');
exports.Task = require('./Task');
exports.Course = require('./Course');