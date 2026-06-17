//GET /api/lessons
//POST /api/lessons
//PUT /api/lessons/:id
//DELETE /api/lessons/:id


const express = require('express');

const {body} = require('express-validator')
//esto en el proyecto de las películas luego se desestructuró
const {getAllLessons,getLessonById,getQuestionsByLesson,createLesson,updateLesson,deleteLesson} = require('../controllers/lesson.controller.js');
//Para que cada grupo de rutas pueda estar en su propia carpeta sin tener que meter todas las rutas en el app.js
const lessonRouter = express.Router();

const validateInputs = require('../middlewares/validateInputs.js')


const validateToken = require('../middlewares/validateToken.js')


// Rutas para Alumnos (requieren autenticación)
lessonRouter.get('/', [validateToken/* , validateRole('admin', 'user') */], getAllLessons)
lessonRouter.get('/:id', [validateToken/* , validateRole('admin', 'user') */], getLessonById)
lessonRouter.get('/:id/questions', [validateToken/* , validateRole('admin', 'user') */], getQuestionsByLesson)

// Rutas para Administradores (rutas privadas)
lessonRouter.post('/', [validateToken,
  /* validateRole('admin', 'user'), */ 
  body('title').notEmpty().withMessage('The title is mandatory'), 
  body('level').notEmpty().withMessage('The level is mandatory'),
  body('type').isIn(['vocabulary', 'grammar', 'reading']).withMessage('The type must be vocabulary, grammar or reading'),
  body('is_published').isBoolean().withMessage('The published field must be true or false'),
  validateInputs
  ], createLesson)
lessonRouter.put('/:id', [validateToken/* , validateRole('admin', 'user') */], updateLesson)
lessonRouter.delete('/:id', [validateToken/* , validateRole('admin', 'user') */], deleteLesson)

module.exports = lessonRouter


