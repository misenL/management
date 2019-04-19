const TeacherProxy = require('../proxy/TeacherProxy');
const TokenUtil = require('../utils/TokenUtil');

//添加老师
exports.saveTeacher = function(req,res,next){
    let teacher_number = req.body.teacher_number;
    let teacher_name = req.body.teacher_name;
    let password = req.body.password;

    let params = {teacher_number,teacher_name,password};
    TeacherProxy.save(params,function(err,result){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }

        response['status'] = 'ok';

        res.send(response);
    });
}

//查询老师
exports.findByCondition = function(req,res,next){
    let field = req.params.field;
    let value = req.params.value;

    let condition = {field:value};

    TeacherProxy.find(condition,function(err,teachers){
        let response = {};
        if(err){
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }

        response['status'] = 'ok';
        response['value'] = teachers;

        res.send(response);
    });
}

//登录
exports.login = function(req,res,next){
    let teacher_number = req.body.teacher_number;
    let password = req.body.password;

    let condition = {teacher_number,password};

    TeacherProxy.find(condition,function(err,teacher){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        console.log("teacher",teacher);
        //查询成功
        response['status'] = 'ok';
        if(teacher){
            response['token'] = TokenUtil.createToken(teacher[0],1000*60*60*24);
            response['value'] = teacher[0];
        }else{
            response['value'] = null;
            response['token'] = null;
        }
        res.send(response);
    });
}

//获取教师数据的主页
exports.index = function(req,res,next){
    //查询该老师的所有课程
    let teacher_id = req.params.teacher_id;

    let condition = {'_id':teacher_id};

    TeacherProxy.find(condition,function(err,teacher){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        //查询成功
        response['status'] = 'ok';
        if(teacher){
            response['value'] = teacher[0];
        }else{
            response['value'] = null;
        }
        res.send(response);
    });
}

exports.findById = function(req,res,next){
    let teacher_id = req.body.teacher_id;

    let condition = {"_id":teacher_id};

    TeacherProxy.findById(condition,function(err,teacher){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        //查询成功
        response['status'] = 'ok';
        response['value'] = teacher;
        res.send(response);
    });
}

