var express = require('express');
var router = express.Router();

const CourseController = require('../../controller/CourseController');

//查询课程的基本信息
router.get('/baseInfo/:courseId',function(req,res,next){
    CourseController.findCourseName(req,res,next);
});

//完成添加
router.post('/saveCourse',function(req,res,next){
    CourseController.saveCourse(req,res,next);
});

//修改课程
router.get('/updateCourse/:courseId',function(req,res,next){
    CourseController.getUpdateCoursePage(req,res,next);
});

router.post('/updateCourse',function(req,res,next){
    CourseController.updateCourse(req,res,next);
});



module.exports = router;