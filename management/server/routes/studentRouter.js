var express = require('express');
var router = express.Router();

var StudentController = require('../controller/StudentController');
var TaskController = require('../controller/TaskController');

router.post('/register',function(req,res,next){
    StudentController.register(req,res,next);
});

router.post('/login',function(req,res,next){
    StudentController.login(req,res,next);
});

//使用id查询学生信息
router.post('/findStudentById',function(req,res,next){
    StudentController.findStudentById(req,res,next);
});

//更新学生信息
router.post('/updateStudentInfo',function(req,res,next){
    StudentController.updateStudentInfo(req,res,next);
});

router.get('/index/:studentId',function(req,res,next){
    StudentController.index(req,res,next);
});

//查询老师信息
router.get('/getByTeacherName/:teacher_name/:studentId',function(req,res,next){
    StudentController.findTeacher(req,res,next);
});

//加入教学班
router.post('/joinClasses',function(req,res,next){
    StudentController.joinClasses(req,res,next);
});

//获取学生提交的记录
router.get('/commitTask/:studentId',function(req,res,next){
    TaskController.commitTask(req,res,next);
});

//学生确定提交作业
router.post('/removeByUploadStudentId',function(req,res,next){
    TaskController.removeByUploadStudentId(req,res,next);
})

module.exports = router;