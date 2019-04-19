var express = require('express');
var router = express.Router();

const TaskController = require('../controller/TaskController');
const uploadUtil = require('../utils/uploadUtil');


/**
 * 教师
 */

//添加一个任务
router.post('/createTask',function(req,res,next){
    TaskController.createTask(req,res,next);
});

//删除一个任务
router.post('/removeTask',function(req,res,next){
    TaskController.removeTask(req,res,next);
});


//查看提交的学生
router.get('/alreayCommit/:taskId',function(req,res,next){
    TaskController.getAreadyCommitStudentMenu(req,res,next);
});

//查看未提交作业的学生
router.get('/unCommit/:taskId/:classesId',function(req,res,next){
    TaskController.getUnCommit(req,res,next);
});

//下载文件
router.get('/download/:path',function(req,res,next){
    TaskController.downloadFile(req,res,next);
});

/**
 * 学生
 */

//上传文件到服务器
router.post('/uploadHomeWork',uploadUtil('').any(),function(req,res,next){
    TaskController.updateTaskHomeWork(req,res,next);
});


/**
 * 公共
 */

//查询task的所有文件
router.get('/findTaskAllFile/:taskId',function(req,res,next){
    TaskController.findTaskAllFile(req,res,next);
});

//查询一个教学班的所有任务
router.get('/findClassesAllTask/:classesId',function(req,res,next){
    TaskController.findClassesAllTask(req,res,next);
});

module.exports = router;