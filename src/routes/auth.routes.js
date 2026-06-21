//POST /api/auth/login
//POST /api/auth/signup



//requerimos express para poder agrupar rutas relacionadas (auth)
const express = require('express');

const {body} = require('express-validator')
//authController desestrucutrado
//getUserId solo en caso de hacer GET /api/auth/:id_user
const {getUserEmail, createUserInDB} = require('../controllers/auth.controller');
//Para que cada grupo de rutas pueda estar en su propia carpeta sin tener que meter todas las rutas en el app.js
const authRouter = express.Router();

const validateInputs = require('../middlewares/validateInputs.js')


//Rutas públicas (no requieren token)
//Caulquier persona puede registrarse en la app
// authRouter.post('/signup', createUserInDB);
authRouter.post('/signup', [
  body('name').notEmpty().withMessage('Name is mandatory'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateInputs
],
 createUserInDB);
//Requiere haberse registrado y tener un email y una contraseña para poder obtener el token
authRouter.post('/login', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is mandatory'),
  validateInputs
],
 getUserEmail);

module.exports = authRouter;


