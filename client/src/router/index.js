import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard  from '../views/Dashboard/dashboardView.vue'
import student  from '../views/Students/studentView.vue'
import addstudent  from '../views/Students/StudentsAdd.vue'
import courses  from '../views/Courses/courses.vue'
import addcourse  from '../views/Courses/CourseAdd.vue'
import booksveiw  from '../views/Library/BooksView.vue'
import addbook  from '../views/Library/BooksAdd.vue'
import addlectures  from '../views/Lectures/LectureAdd.vue'
import lectures  from '../views/Lectures/lecturesView.vue'
import addedstudent  from '../views/Students/AddedStudent.vue'
import addedcourse  from '../views/Courses/AddedCourse.vue'
import addedlecture from '../views/Lectures/AddedLecture.vue'
import addedbook from '../views/Library/AddedBook.vue'


Vue.use(VueRouter)

const routes = [
  

  // {
  //   path: '/student',
  //   name: 'student',
  //   component: student
  // },
  {
    path: '/',
    name: 'dashboard',
    component: dashboard
  },
  // {
  //   path: '/courses',
  //   name: 'courses',
  //   component: courses
  // },
  // {
  //   path: '/addstudent',
  //   name: 'addstudent',
  //   component: addstudent
  // },
  // {
  //   path: '/addcourse',
  //   name: 'addcourse',
  //   component: addcourse
    
  // },
  // {
  //   path: '/booksveiw',
  //   name: 'booksveiw',
  //   component: booksveiw
    
  // },
  // {
  //   path: '/addbook',
  //   name: 'addbook',
  //   component: addbook
    
  // },
  // {

  //   path: '/lectures',
  //   name: 'lectures',
  //   component: lectures

  // },
  // {

  //   path: '/addlecture',

  //   name: 'lecture',

  //   component: addlectures

  // },
  // {
  //   path: '/addedstudent',
  //   name: 'addedstudent',
  //   component: addedstudent
  // },

  // {
  //   path: '/addedcourse',
  //   name: 'addedcourse',
  //   component: addedcourse
  // },

  // {
  //   path: '/addedlecture',
  //   name: 'addedlecture',
  //   component: addedlecture
  // },

  // {
  //   path: '/addedbook',
  //   name: 'addedbook',
  //   component: addedbook
  // },
]

const router = new VueRouter({
  routes
})

export default router
