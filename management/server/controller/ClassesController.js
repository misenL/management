const ClassesProxy = require('../proxy/ClassesProxy');
const TeacherProxy = require('../proxy/TeacherProxy');
const CourseProxy = require('../proxy/CourseProxy');

//创建一个教学班
/**
 * 课程id，将课程和教学班联系起来
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.saveClasses = function(req,res,next){
    let courseId = req.body.courseId;
    let classes_code = req.body.classes_code;
    let classes_desc = req.body.classes_desc;
    let belong_course = courseId;
    let create_time = new Date();
    
    let params = {classes_code,classes_desc,create_time,belong_course};

    //教学班保存
    let classesSave = new Promise((resolve, reject)=>{
        ClassesProxy.save(params,function(error,classes){
            resolve(classes);
        });
    });
    
    //将教学班和课程互相对应
    Promise.all([classesSave]).then(values => { 
        let classes = values[0];
        if(classes){
            let classesId = classes._id;
            let condition = {'_id':courseId};
            let update = {$push:{"classes_list":classesId}};
            CourseProxy.update(condition,update,function(err){
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

/**
 * 查询某个教师的所有教学班
 * @param {*} req 请求信息
 * @param {*} res 
 * @param {*} next 
 */
exports.findByTeacherId = function(req,res,next){
    let teacher_Id = req.body.teacher_id;
    console.log("req.body",req.body);
    console.log("teacher_Id",teacher_Id);
    let condition = {'_id':teacher_Id};
    TeacherProxy.find(condition,function(err,teachers){
        let response = {};
        if(err){
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }
        response['status'] = 'ok';
        response['value'] = teachers[0];
        console.log(teachers);

        res.render('addTask',{response:response});
    });

}

/**
 * 根据id查询教学班的信息
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findByClassesId = function(req,res,next){
    let classesId = req.params.classesId;
    let condition = {'_id':classesId};
    ClassesProxy.find(condition,function(err,classes){
        let response = {};
        if(err){
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }
        response['status'] = 'ok';
        response['value'] = classes[0];

        res.send(response);
    });
}

/**
 * 学生加入教学班
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addStudentToClasses = function(req,res,next){
    let studentId = req.body.studentId;
    let classesId = req.body.classesId;

    let condition = {'_id':classesId};
    let update = {$push:{"student_list":studentId}};

    //在教学班表中更新学生
    ClassesProxy.update(condition,update,function(err){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        response['status'] = 'ok';

        res.send(response);
    });
}













