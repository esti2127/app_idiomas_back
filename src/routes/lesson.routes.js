//GET /api/lessons
//POST /api/lessons
//PUT /api/lessons/:id
//DELETE /api/lessons/:id


const express = require('express');

const {body} = require('express-validator')
//esto en el proyecto de las películas luego se desestructuró
const {getAllLessons,getLessonById, createQuestion, getQuestionsByLesson,createLesson,updateLesson,deleteLesson, createAnswer, updateQuestion, deleteQuestion, updateAnswer, deleteAnswer, getQuestionsWithAnswers, getLessonsWithQuestionsAndAnswers} = require('../controllers/lesson.controller.js');
//Para que cada grupo de rutas pueda estar en su propia carpeta sin tener que meter todas las rutas en el app.js
const lessonRouter = express.Router();

const validateInputs = require('../middlewares/validateInputs.js')


const validateToken = require('../middlewares/validateToken.js');
const validateRole = require('../middlewares/validaterole.js');


// Rutas para Alumnos (requieren autenticación)
lessonRouter.get('/', [validateToken, validateRole('admin', 'user')], getAllLessons)

lessonRouter.get('/with_data'/* , [validateToken, validateRole('admin', 'user')] */, getLessonsWithQuestionsAndAnswers)


lessonRouter.get('/:id', [validateToken, validateRole('admin', 'user')], getLessonById)
lessonRouter.post('/questions', [validateToken, validateRole('admin'), 
  body('id_lesson').notEmpty().withMessage('The id_lesson is mandatory'), 
  body('question_text').notEmpty().withMessage('The question_text is mandatory'),
  body('type').isIn(['Fill in the blank', 'multiple choice']).withMessage('The type must be Fill in the blank or multiple choice'),
  validateInputs
], createQuestion)

lessonRouter.get('/questions/:id', [validateToken, validateRole('admin', 'user')], getQuestionsByLesson)

lessonRouter.post('/questions/answers', [validateToken, validateRole('admin'),
  body('id_question').notEmpty().withMessage('The id_question is mandatory'), 
  body('answer_text').notEmpty().withMessage('The answer_text is mandatory'),
  body('is_correct').isBoolean().withMessage('The published field must be true or false'),
  validateInputs
], createAnswer)

lessonRouter.put('/questions/:id', [validateToken, validateRole('admin'),
  body('id_lesson').notEmpty().withMessage('The id_lesson is mandatory'), 
  body('question_text').notEmpty().withMessage('The question_text is mandatory'),
  body('type').isIn(['Fill in the blank', 'multiple choice']).withMessage('The type must be Fill in the blank or multiple choice'),
  validateInputs
], updateQuestion)

lessonRouter.delete('/questions/:id', [validateToken, validateRole('admin')], deleteQuestion)

lessonRouter.put('/questions/answers/:id', [validateToken, validateRole('admin'),
  body('id_question').notEmpty().withMessage('The id_question is mandatory'), 
  body('answer_text').notEmpty().withMessage('The answer_text is mandatory'),
  body('is_correct').isBoolean().withMessage('The published field must be true or false'),
  validateInputs
], updateAnswer)

lessonRouter.delete('/questions/answers/:id', [validateToken, validateRole('admin')], deleteAnswer)



// Rutas para Administradores (rutas privadas)
lessonRouter.post('/', [validateToken,
  validateRole('admin'), 
  body('title').notEmpty().withMessage('The title is mandatory'), 
  body('level').notEmpty().withMessage('The level is mandatory'),
  body('type').isIn(['vocabulary', 'grammar', 'reading']).withMessage('The type must be vocabulary, grammar or reading'),
  body('is_published').isBoolean().withMessage('The published field must be true or false'),
  validateInputs
  ], createLesson)

lessonRouter.put('/:id', [validateToken, validateRole('admin'),
  body('title').notEmpty().withMessage('The title is mandatory'), 
  body('level').notEmpty().withMessage('The level is mandatory'),
  body('type').isIn(['vocabulary', 'grammar', 'reading']).withMessage('The type must be vocabulary, grammar or reading'),
  body('is_published').isBoolean().withMessage('The published field must be true or false'),
  validateInputs
], updateLesson)

lessonRouter.delete('/:id', [validateToken, validateRole('admin'),], deleteLesson)


lessonRouter.get('/questions/:id/with_answers', [validateToken, validateRole('admin', 'user')], getQuestionsWithAnswers)



module.exports = lessonRouter
