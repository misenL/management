var express = require('express');
var router = express.Router();

const ClassesController = require('../controller/ClassesController');


//完成添加
router.post('/saveClasses',function(req,res,next){
    ClassesController.saveClasses(req,res,next);
});

//根据教师id查询所有的教学班
router.post('/getClasses',function(req,res,next){
    ClassesController.findByTeacherId(req,res,next);
});

module.exports = router;