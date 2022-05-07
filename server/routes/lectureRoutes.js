const express = require('express');
const router = express.Router();
const lectureapi = require('../controllers/lectureControllers');

//get all the lecture 
router.get('/',lectureapi.fetchAlllectures);

//crete new lecture with image
router.post('/',lectureapi.createlecture);

//get lecture id 
router.get('/:id',lectureapi.fetchlectureByid);

//update lecture 
router.put('/:id',lectureapi.updatelectureByid);

//delete lecture
router.delete('/:id',lectureapi.deletelectureByid);

module.exports = router;