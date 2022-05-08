import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard  from '../views/Dashboard/dashboardView.vue'
import courses  from '../views/Courses/courses.vue'
import coursesReport  from '../views/Courses/coursesReport.vue'
import addcourse  from '../views/Courses/CourseAdd.vue'
import student  from '../views/Students/studentView.vue'
import addstudent  from '../views/Students/StudentsAdd.vue'
import studentReport  from '../views/Students/studentReport.vue'
import addlectures  from '../views/Lectures/LectureAdd.vue'
import lectures  from '../views/Lectures/lecturesView.vue'
import lecturesReport from '../views/Lectures/lecturesReport.vue'




Vue.use(VueRouter)

const routes = [

  
  //create student route
 
  {
    path: '/',
    name: 'dashboard',
    component: dashboard
  },
 
  {
    path: '/courses',
    name: 'courses',
    component: courses
  },

  {
    path: '/addcourse',
    name: 'addcourse',
    component: addcourse
  },
  {
    path: '/coursesReport',
    name: 'coursesReport',
    component: coursesReport
  },
  {
    path: '/student',
    name: 'student',
    component: student
  },

  {
    path: '/studentReport',
    name: 'studentReport',
    component: studentReport
  },
  {
    path: '/addstudent',
    name: 'addstudent',
    component: addstudent
  },
  
  {

    path: '/lectures',
    name: 'lectures',
    component: lectures

  },

  {

    path: '/addlecture',
    name: 'lecture',
    component: addlectures
  },

  {
    path: '/lecturesReport',
    name: 'lecturesReport',
    component: lecturesReport
  },

]

const router = new VueRouter({
  routes
})

export default router
