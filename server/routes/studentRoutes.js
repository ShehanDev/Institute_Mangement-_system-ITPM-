const express = require('express');
const router = express.Router();
const studentapi = require('../controllers/studenntControllers');


//get all the student 
router.get('/',studentapi.fetchAllstudents);

//crete new student with image
router.post('/',studentapi.createstudent);

//get student id 
router.get('/:id',studentapi.fetchstudentByid);

//update student 
router.put('/:id',studentapi.updatestudentByid);

//delete student
router.delete('/:id',studentapi.deletestudentByid);

module.exports = router;