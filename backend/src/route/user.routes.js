const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
