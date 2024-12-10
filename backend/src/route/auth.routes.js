const express = require('express');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Route pour le login
router.post('/login', authController.login);

// Route pour obtenir les informations de l'utilisateur connecté
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
