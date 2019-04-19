const CourseProxy = require('../proxy/CourseProxy');
const ClassesProxy = require('../proxy/ClassesProxy');
const TeacherProxy = require('../proxy/TeacherProxy');

//创建一门课程
exports.saveCourse = function(req,res,next){
    let teacher_id = req.body.teacher_id;
    let course_code = req.body.course_code;
    let course_name = req.body.course_name;
    let course_desc = req.body.course_desc;
    let create_time = new Date();
    
    let params = {course_code,course_name,course_desc,create_time};

    //课程保存
    let courseSave = new Promise((resolve, reject)=>{
        CourseProxy.save(params,function(error,course){
            resolve(course);
        });
    });
    
    //将课程和老师互相对应
    Promise.all([courseSave]).then(values => { 
        let course = values[0];
        if(course){
            let courseId = course._id;
            let condition = {'_id':teacher_id};
            let update = {$push:{"course_list":courseId}};
            TeacherProxy.update(condition,update,function(err){
                let response = {};

                if(err){
                    response['status'] = 'error';
                    response['value'] = err;
                    throw err;
                }else{
                    response['status'] = 'ok';
                }
                res.send(response);
            });
        }
    });
}

//获得修改课程的界面
exports.getUpdateCoursePage = function(req,res,next){
    let courseId = req.params.courseId;
    let condition = {'_id':courseId}

    //查询课程信息并返回
    CourseProxy.find(condition,function(err,course){
        let response = {};

        if(err){
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }else{
            response['status'] = 'ok';
            response['value'] = course[0];
        }
        res.send(response);
    });
}

//完成修改
exports.updateCourse = function(req,res,next){
    //修改的id
    let courseId = req.body.courseId;
    //修改的内容
    let course_code = req.body.course_code;
    let course_name = req.body.course_name;
    let course_desc = req.body.course_desc;

    let condition = {'_id':courseId};
    let update = {course_code,course_name,course_desc};

    CourseProxy.update(condition,update,function(err){
        let response = {};

        if(err){
            response['status'] = 'error';
            throw err;
        }else{
            response['status'] = 'ok';
        }
        res.send(response);
    });
}

//查询课程基本信息
exports.findCourseName = function(req,res,next){
    let condition = {"_id":req.params.courseId};
    CourseProxy.findBaseInfo(condition,function(err,course){
        let response = {};

        if(err){
            response['status'] = 'error';
            throw err;
        }else{
            response['status'] = 'ok';
        }
        response['value'] = course[0];
        res.send(response);
    });
}