const models = require('../models');
const Task = models.Task;

/**
 * 
 * @param {*} params  添加的任务的信息 
 * @param {*} callback 回调
 */
exports.save = function(params,callback){
    let task = new Task(params);
    task.save(callback);
}

/**
 * 查询任务
 * @param {*} condition 
 * @param {*} callback 
 */
/**
 * {
        path:'task_files',
        select: '_id file_url post_time uploader',
        populate: {
            path: 'uploader',
            select: '_id student_number',
            model: 'Student'
        }
    }
 */
exports.find = function(condition,callback){
    Task.find(condition).populate({
        path:'task_files.uploader',
        select: '_id student_number'
    }).populate('belong_classes').exec(callback);
}

/**
 * 删除一个任务
 * @param {*} condition 
 * @param {*} callback 
 */
exports.remove = function(condition,callback){
    Task.remove(condition).exec(callback);
}

//更新一个任务
exports.update = function(condition,update,callback){
    Task.update(condition,update,callback);
}

//查询某个学生提交在任务中的多个文件
exports.findTaskUploader = function(condition,callback){
    Task.aggregate().unwind('task_files').match({'task_files.uploader':condition}).exec(callback);
}

//根据学生id和提交的文件删除记录
exports.removeByUploadStudentId = function(condition,update,callback){
    Task.update(condition,update).exec(callback);
}

