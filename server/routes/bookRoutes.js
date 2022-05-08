const express = require('express');
const router = express.Router();
const bookapi = require('../controllers/booksControllers');


//get all the book 
router.get('/',bookapi.fetchAllbooks);

//crete new book with image
router.post('/',bookapi.createbook);

//get book id 
router.get('/:id',bookapi.fetchbookByid);

//update book 
router.put('/:id',bookapi.updatebookByid);

//delete book
router.delete('/:id',bookapi.deletebookByid);

module.exports = router;