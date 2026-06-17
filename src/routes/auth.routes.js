//POST /api/auth/login
//POST /api/auth/signup



//requerimos express para poder agrupar rutas relacionadas (auth)
const express = require('express');
//authController desestrucutrado
//getUserId solo en caso de hacer GET /api/auth/:id_user
const {getUserEmail, createUserInDB} = require('../controllers/auth.controller');
//Para que cada grupo de rutas pueda estar en su propia carpeta sin tener que meter todas las rutas en el app.js
const authRouter = express.Router();


//Rutas públicas (no requieren token)
//Caulquier persona puede registrarse en la app
// authRouter.post('/signup', createUserInDB);
authRouter.post('/signup', createUserInDB);
//Requiere haberse registrado y tener un email y una contraseña para poder obtener el token
authRouter.post('/login' , getUserEmail);

module.exports = authRouter;


