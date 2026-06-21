//GET /api/progress
//POST /api/progress

const express = require('express');

const {body} = require('express-validator')


const {getAllProgress, createProgress, updateProgress, deleteProgress} = require('../controllers/progress.controller.js');

const progressRouter = express.Router();

const validateInputs = require('../middlewares/validateInputs.js')


const validateToken = require('../middlewares/validateToken.js');
const validateRole = require('../middlewares/validaterole.js');



progressRouter.get('/', [validateToken, validateRole('admin', 'user')], getAllProgress)

progressRouter.post('/', [validateToken, validateRole('admin', 'user'),
   body('id_lesson').notEmpty().withMessage('The id_lesson is mandatory'), 
  validateInputs
], createProgress)

progressRouter.put('/:id', [validateToken, validateRole('admin'),
  body('is_completed').isBoolean().withMessage('The published field must be true or false'),
  body('score').notEmpty().isInt().withMessage('The score is mandatory and must be a number'), 
  validateInputs
], updateProgress)

progressRouter.delete('/:id', [validateToken, validateRole('admin')], deleteProgress)



module.exports = progressRouter
