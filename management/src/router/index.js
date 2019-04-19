import Vue from 'vue'
import Router from 'vue-router'
//主页
import Index from '@/components/index'

//教师端
import Teacher_main from '@/components/teacher/Teacher_main'
import LoginPanel from '@/components/teacher/login'
import addCoursePanel from '@/components/teacher/course/addCoursePanel'
import addClassesPanel from '@/components/teacher/classes/addClassesPanel'
import updateCoursePanel from '@/components/teacher/course/updateCoursePanel'
//课程的所有任务
import allTaskPanel from '@/components/teacher/task/allTaskPanel'
//某一个任务的详情
import OneTaskInfoPanel from '@/components/teacher/task/oneTaskInfo'
import SettingPanel from '@/components/teacher/setting/setting'

//学生
import StudentLoginVue from '@/components/student/loginPanel'
import StudentPanel from '@/components/student/Student_main'
//搜索结果
import SearchResultPanel from '@/components/student/searchResult'
//查看教学班的所有任务
import ClassesTaskPanel from '@/components/student/ClassesTask'
//查看任务内提交的人数信息
import homeWorkUploadPanel from '@/components/student/homeWorkUploadPanel'
//
import StudentInfo from '@/components/student/StudentInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:Index
    },
    {
      path: '/teacher',
      name: 'Teacher_main',
      component: Teacher_main,
      children: [
        {path: 'addCoursePanel', component: addCoursePanel },
        //给课程添加教学班
        {path:'classes/add/:courseId',component:addClassesPanel},
        //更新课程信息
        {path:'updateCourse/:courseId',component:updateCoursePanel},
        {path:':classes/taskes',component:allTaskPanel},
        {path:'task/:taskId',component:OneTaskInfoPanel},
        {path:'setting/:teacher_id',component:SettingPanel}
      ]
    },
    {
      path:'/teacher/login',
      component:LoginPanel
    },
    //学生
    {
      name: 'Student',
      path:'/student',
      component:StudentPanel,
      children: [
        {path: 'search/:value', component:SearchResultPanel },
        {path:'allTask/:classesId',component:ClassesTaskPanel},
        {path:'homeWorkUploadPanel/:taskId',component:homeWorkUploadPanel},
        {path:'studentInfo/:studentId',component:StudentInfo}
      ]
    },
    {
      path:'/student/login',
      component:StudentLoginVue
    }
  ]
})
