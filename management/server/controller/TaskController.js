//任务dao
const TaskProxy = require('../proxy/TaskProxy');
//教学班dao
const ClassesProxy = require('../proxy/ClassesProxy');
//学生dao
const StudentProxy = require('../proxy/StudentProxy');
let process = require('process');
let fs = require('fs');


/**
 * 创建一个任务,获取任务信息以及教学班的id
 * 在创建完任务之后往教学班中加入任务
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createTask = function(req,res,next){
    //任务名称
    let task_name = req.body.task_name;
    let task_desc = req.body.task_desc;
    let classesId = req.body.classesId; 

    let params = {task_name,task_desc,belong_classes:classesId};

    //添加一个任务
    let TaskSave = new Promise((resolve, reject)=>{
        TaskProxy.save(params,function(err,task){
            resolve(task);
        });
    });

    //将任务和教学班关联
    Promise.all([TaskSave]).then(values => {
        let task = values[0];
        //教学班id
        let taskId = task._id;

        let condition = {'_id':classesId};
        let update = {$push:{"task_list":taskId}};
        ClassesProxy.update(condition,update,function(err){
            let response = {};
            if(err){
                response['status'] = 'error';
                throw err;
            }
            response['status'] = 'ok';
    
            res.send(response);
        });
    });
}


//查询某一个教学班的所有任务
exports.findClassesAllTask = function(req,res,next){
    let classesId = req.params.classesId;
    let condition = {"_id":classesId};

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

//删除任务
exports.removeTask = function(req,res,next){
    let taskId = req.post.taskId;

    let condition = {'_id':taskId};

    TaskProxy.remove(condition,function(err){
        let response = {};
        if(err){
            response['status'] = 'error';
            throw err;
        }
        response['status'] = 'ok';

        res.send(response);
    });
}

//上传作业并添加到对应的任务底下
exports.updateTaskHomeWork = function(req,res,next){
    let destination = req.files[0].destination;
    let filename = req.files[0].filename;
    let convertPath = destination.substring(destination.indexOf('upload')-1,destination.length) + '/' + filename; 

    let taskId = req.body.taskId;
    let studentId = req.body.studentId;

    let condition = {'_id':taskId};

    let updateField = {$push:{"task_files":{file_url:convertPath,uploader:studentId,post_time:new Date(),is_Commit:false}}};

    console.log("update",updateField);

    TaskProxy.update(condition,updateField,function(err,result){
        let response = {};
        if(err){
            console.log("err",err);
            response['status'] = 'error';
            throw err;
        }
        response['status'] = 'ok';

        res.send(response);
    });
}


//查询task下的所有文件
exports.findTaskAllFile = function(req,res,next){
    //taskid
    let taskId = req.params.taskId;
    let condition = {"_id":taskId};
    
    //
    TaskProxy.find(condition,function(err,tasks){
        let response = {};
        if(err){
            console.log("err",err);
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }
        response['status'] = 'ok';
        response['value'] = tasks[0];
        res.send(response);
    });
}

//查询完成已经交作业的所有学生
/**
 * 1.查询教学班的所有学生列表
 * 2.查询任务下提交的学生Id
 * 3.两项进行对比
 */
exports.getAreadyCommitStudentMenu = function(req,res,next){
    //任务id
    let taskId = req.params.taskId;

    let TaskFind = new Promise((resolve, reject)=>{
        //查询任务
        let condition = {'_id':taskId};
        TaskProxy.find(condition,function(err,tasks){
            resolve(tasks[0]);
        });
    });

    Promise.all([TaskFind]).then(values => {
        //获取该任务下提交的所有学生的列表
        let task = values[0];

        //上传的所有文件
        let uploadStudentList = task.task_files;
        //学生列表
        let studentIdList = [];
        for(let i = 0; i < uploadStudentList.length; i++){
            if(uploadStudentList[i].is_Commit){
                studentIdList.push(uploadStudentList[i].uploader);
            }
        }

        //查询这些学生的信息
        let studentCondition = {"_id":{$in:studentIdList}};
        StudentProxy.findStudentPublicInfo(studentCondition,function(err,students){
            let response = {};
            if(err){
                console.log("err",err);
                response['status'] = 'error';
                response['value'] = err;
                throw err;
            }
            response['status'] = 'ok';
            response['value'] = students;
            res.send(response);
        });
    });
}

//查看还没提交的学生
exports.getUnCommit = function(req,res,next){
    let taskId = req.params.taskId;
    //班级id
    let classesId = req.params.classesId;
    //查询所有提交的学生的id
    let CommitStudentFind = new Promise((resolve, reject)=>{
        let condition = {'_id':taskId};
        TaskProxy.find(condition,function(err,tasks){
            let commitStudentList = [];
            let task = tasks[0];
            for(let i = 0; i < task.task_files.length; i++){
                if(task.task_files[i].is_Commit){
                    commitStudentList.push(task.task_files[i].uploader._id);
                }
            }
            resolve(commitStudentList);
        });
    });
    //查询班级的学生列表，查询不在其中的学生
    Promise.all([CommitStudentFind]).then(values => {
        //已经提交的所有学生
        let studentList = values[0];
        console.log("studentList",studentList);
        let condition = {'_id':classesId};
        ClassesProxy.find(condition,function(err,classes){
            let findClasses = classes[0];
            let unCommit = [];
            if(studentList.length == 0){
                unCommit = findClasses.student_list;
            }else{
                for(let k = 0; k < findClasses.student_list.length; k++){
                    for(let m = 0; m < studentList.length; m++){
                        console.log(typeof studentList[m], typeof findClasses.student_list[k]._id);
                        if(JSON.stringify(studentList[m]) != JSON.stringify(findClasses.student_list[k]._id)){
                            unCommit.push(findClasses.student_list[k]);
                        }
                    }
                }
            }
            res.send({unCommit});
        });
    });
}

//学生完成任务的提交并确定
exports.commitTask = function(req,res,next){
    //查询任务下所有提交人的id为当前学生的作业
    let studentId = req.params.studentId;
    TaskProxy.findTaskUploader(studentId,function(err,tasks){
        let response = {};
        if(err){
            console.log("err",err);
            response['status'] = 'error';
            response['value'] = err;
            throw err;
        }
        response['status'] = 'ok';
        response['value'] = tasks;
        res.send(response);
    });
}

//删除除了确定文件之外的其他文件
//获取确定文件的Id
//删除除了这个文件以外的其他文件
//将这个文件的is_commit设置为true
exports.removeByUploadStudentId = function(req,res,next){
    let studentId = req.body.studentId;
    let fileId = req.body.fileId;
    let taskId = req.body.taskId;
    let condition = {"_id":taskId};
    let update = {$pull:{"task_files":{"_id":{$ne:fileId},"uploader":studentId}}};
    console.log("condition",condition);
    console.log("update",update);

    TaskProxy.removeByUploadStudentId(condition,update,function(remove_err,result){
        //将确定的哪一个的isCommit修改为true;
        let statusCondition = {"_id":taskId,"task_files._id":fileId};
        let StatusUpdate = {$set:{
            "task_files.$.is_Commit":true
        }};
        TaskProxy.update(statusCondition,StatusUpdate,function(err){
            let response = {};
            if(err){
                response['status'] = 'error';
                throw err;
            }
            response['status'] = 'ok';
            res.send(response);
        });
       
    });
}

//下载文件
exports.downloadFile = function(req,res,next){
    //获取文件地址
    let url = req.params.path;
    let myPath = process.cwd() + '/public/upload/' + url;
    res.download(myPath,url, function(err){
        if (err) {
        } else {
        }
      });
}