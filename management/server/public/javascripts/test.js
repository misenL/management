$(function(){

    //注册
    /* $('#reg').click(function(){
        let teacher_number = $('#teacher_number').val();
        let teacher_name = $('#teacher_name').val();
        let password = $('#password').val();

        $.post("/teacher/saveTeacher",{teacher_number,teacher_name,password},function(response){
            console.log(response);
        });
    }); */

    //添加教学班
   /*  $('#addClasses').click(function(){
        let teacher_id = $('#teacher_id').val();
        let classes_code = $('#classes_code').val();
        let classes_name = $('#classes_name').val();
        let classes_desc = $('#classes_desc').val();

        $.post("/classes/saveClasses",{teacher_id,classes_code,classes_name,classes_desc},function(response){
            console.log(response);
        });
    }); */
    /* $('#getClasses').click(function(){
        let teacher_id = $('#teacher_id').val();

        $.get("/classes/getClasses/" + teacher_id,function(response){
            console.log(response);
        });
    }); */

    //添加任务
    $('#addTask').click(function(){
        var task_name = $('#task_name').val();
        var classesId = $('#classes_id').val();
        console.log(task_name + "," + classes_id);
        $.post("/task/createTask",{task_name,classesId},function(response){
            console.log(response);
        });
    });
});