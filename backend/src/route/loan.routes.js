const express = require('express');
const loanController = require('../controller/loan.controller');
const router = express.Router();

router.post('/', loanController.createLoan);
router.get('/', loanController.getLoans);
router.patch('/:id/return', loanController.returnLoan);

module.exports = router;
