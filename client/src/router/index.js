import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard  from '../views/Dashboard/dashboardView.vue'
import courses  from '../views/Courses/courses.vue'
import coursesReport  from '../views/Courses/coursesReport.vue'
import addcourse  from '../views/Courses/CourseAdd.vue'



Vue.use(VueRouter)

const routes = [
 
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
  }
  


 

]

const router = new VueRouter({
  routes
})

export default router
