//POST /api/auth/login
//POST /api/auth/signup


const express = require('express');
//esto en el proyecto de las películas luego se desestructuró
const authController = require('../controllers/auth.controller.js');
const authRouter = express.Router();

// POST /api/auth/register
// authRouter.post('/signup', authController.signup);
// authRouter.post('/login', authController.login);

module.exports = authRouter;