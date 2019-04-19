const StudentProxy = require('../proxy/StudentProxy');
const TokenUtil = require('../utils/TokenUtil');
const TeacherProxy = require('../proxy/TeacherProxy');
//教学班
const ClassesProxy = require('../proxy/ClassesProxy');

/**
 * 添加（注册）一个学生
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.register = function(req,res,next){
    let student_number = req.body.student_number;
    let password = req.body.password;
    let student_name = req.body.student_name;

    let params = {student_number,password,student_name};

    StudentProxy.save(params,function(err,student){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        response['status'] = 'ok';

        res.send(response);
    });
}


/**
 * 学生登录
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = function(req,res,next){
    let student_number = req.body.student_number;
    let password = req.body.password;

    let condition = {student_number,password};

    StudentProxy.find(condition,function(err,student){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        //查询成功
        response['status'] = 'ok';
        if(student){
            response['token'] = TokenUtil.createToken(student[0],1000*60*60*24);
            response['value'] = student[0];
        }else{
            response['value'] = null;
            response['token'] = null;
        }
        res.send(response);
    });
}

//更新学生信息
exports.updateStudentInfo = function(req,res,next){
    //学生id
    let _id = req.body._id;
    let student_name = req.body.student_name;
    let password = req.body.password;
    let condition = {_id};
    let update = {student_name,password};

    StudentProxy.update(condition,update,function(err){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        //查询成功
        response['status'] = 'ok';
        res.send(response);
    });
}


//根据id查询学生信息
exports.findStudentById = function(req,res,next){
    let condition = {'_id':req.body.studentId};
    StudentProxy.findStudentPersonInfo(condition,function(err,students){
        let student = students[0];
        let response = {};
        if(err){
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }
        //查询成功
        response['status'] = 'ok';
        response['value'] = student;
        res.send(response);
    });
}

//查询该学生的所有的教学班
exports.index = function(req,res,next){
    let studentId = req.params.studentId;
    let condition = {"_id":studentId};
    StudentProxy.find(condition,function(err,student){
        let response = {};
        if(err){
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }
        //查询成功
        response['status'] = 'ok';
        response['value'] = student[0];
        res.send(response);
    });
}

//根据老师名称查询教学班,并同时查询该学生加入的教学班
exports.findTeacher = function(req,res,next){
    let teacher_name = req.params.teacher_name;
    let studentId = req.params.studentId;

    //老师查询
    let TeacherFind = new Promise((resolve, reject)=>{
        let condition = {teacher_name};
        TeacherProxy.find(condition,function(err,teacher){
            resolve(teacher);
        });
    });

    //学生查询
    Promise.all([TeacherFind]).then(values => {
        let condition = {'_id':studentId};
        StudentProxy.find(condition,function(err,students){
            let teachers = values[0];
            let student =  students[0];
            let response = {};
            if(err){
                response['status'] = 'error';
                response['value'] = err;
                throw err;
            }
            //查询成功
            response['status'] = 'ok';
            response['teacher'] = teachers;
            response['student'] = student;
            res.send(response);
        });
    });
}

//加入教学班
exports.joinClasses = function(req,res,next){
    //教学班id
    let classesId = req.body.classesId;
    let studentId = req.body.studentId;

    //教学班添加学生
    let ClassesJoinStudent = new Promise((resolve, reject)=>{
        let condition = {'_id':classesId};
        let update = {$push:{"student_list":studentId}};
        ClassesProxy.update(condition,update,function(err,result){
            resolve(result);
        });
    });

    // 学生添加教学班列表中加入教学班
    Promise.all([ClassesJoinStudent]).then(values => {
        let result = values[0];
        let condition = {'_id':studentId};
        let update = {$push:{"join_clasess":classesId}};
        StudentProxy.update(condition,update,function(err,studentUpdate){
            let response = {};
            if(err){
                response['status'] = 'error';
                throw err;
            }
            //查询成功
            response['status'] = 'ok';
            res.send(response);
        });

    });
}








