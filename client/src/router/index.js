import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard  from '../views/Dashboard/dashboardView.vue'
import booksveiw  from '../views/Library/BooksView.vue'
import addbook  from '../views/Library/BooksAdd.vue'
import BookReport from '../views/Library/BooksReport.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'dashboard',
    component: dashboard
  },
 
  //Library Routes
  {
    path: '/booksveiw',
    name: 'booksveiw',
    component: booksveiw
    
   },
  {
    path: '/addbook',
    name: 'addbook',
    component: addbook
    
  },

  {
    path: '/BookReport',
    name: 'BookReport',
    component: BookReport

  },
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
]

const router = new VueRouter({
  routes
})

export default router
