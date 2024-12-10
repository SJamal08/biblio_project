const express = require('express');
const bookController = require('../controller/book.controller');
const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
