const express = require('express');
const router = express.Router();
const courseapi = require('../controllers/courseControllers');


//get all the course 
router.get('/',courseapi.fetchAllcourses);

//crete new course with image
router.post('/',courseapi.createcourse);

//get course id 
router.get('/:id',courseapi.fetchcourseByid);

//update course 
router.put('/:id',courseapi.updatecourseByid);

//delete course
router.delete('/:id',courseapi.deletecourseByid);

module.exports = router;