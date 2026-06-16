//GET /api/lessons
//POST /api/lessons
//PUT /api/lessons/:id
//DELETE /api/lessons/:id


const express = require('express');
//esto en el proyecto de las películas luego se desestructuró
const {getAllLessons,getLessonById,getQuestionsByLesson,createLesson,updateLesson,deleteLesson} = require('../controllers/lesson.controller.js');
const lessonRouter = express.Router();


// const {validateRole} = require('../middlewares/validateRole.js')





// Rutas para Alumnos (rutas públicas)
lessonRouter.get('/'/* , [validateRole] */, getAllLessons)
lessonRouter.get('/:id'/* , [validateRole] */, getLessonById)
lessonRouter.get('/:id/questions'/* , [validateRole] */, getQuestionsByLesson)

// Rutas para Administradores (rutas privadas)
lessonRouter.post('/'/* , [validateRole] */, createLesson)
lessonRouter.put('/:id'/* , [validateRole] */, updateLesson)
lessonRouter.delete('/:id'/* , [validateRole] */, deleteLesson)

module.exports = lessonRouter






module.exports = lessonRouter