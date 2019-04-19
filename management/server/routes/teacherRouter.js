var express = require('express');
var router = express.Router();

const TeacherController = require('../controller/TeacherController');

//添加页面
router.get('/:teacher_id', function(req, res, next) {
    TeacherController.index(req,res,next);
});

//完成添加
router.post('/saveTeacher',function(req,res,next){
    TeacherController.saveTeacher(req,res,next);
});

router.post('/login',function(req,res,next){
    TeacherController.login(req,res,next);
});

//教师查询信息
router.post('/findById',function(req,res,next){
    TeacherController.findById(req,res,next);
});

module.exports = router;
