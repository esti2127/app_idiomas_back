const queries = {

  selectUser: 'SELECT * FROM users WHERE email = $1',
  insertUser: 'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',

  selectAllLessons: 'SELECT * FROM lessons ORDER BY id_lesson',
  selectLessonId: 'SELECT * FROM lessons WHERE id_lesson = $1',
  insertQuestion: 'INSERT INTO questions (id_lesson, question_text, type, lesson_number) VALUES ($1, $2, $3, $4) RETURNING *',
  selectQuestionId: 'SELECT * FROM questions WHERE id_lesson= $1',
  insertAnswer: 'INSERT INTO answers (id_question, answer_text, is_correct) VALUES ($1, $2, $3) RETURNING *',
  // selectAnswerId: 'SELECT * FROM answers WHERE id_answer = $1',
  insertLesson: 'INSERT INTO lessons (title, level, type, is_published) VALUES ($1, $2, $3, $4) RETURNING *',
  updateLesson: 'UPDATE lessons SET title = $2, level = $3, type = $4, is_published = $5 WHERE id_lesson = $1 RETURNING * ',
  deleteLesson: 'DELETE from lessons WHERE id_lesson = $1 RETURNING *',
  updateQuestion: 'UPDATE questions SET id_lesson = $2, question_text = $3, type = $4, lesson_number = $5 WHERE id_question = $1 RETURNING * ',
  deleteQuestion: 'DELETE from questions WHERE id_question = $1 RETURNING *',
  updateAnswer: 'UPDATE answers SET id_question = $2, answer_text = $3, is_correct = $4 WHERE id_answer = $1 RETURNING * ',
  deleteAnswer: 'DELETE from answers WHERE id_answer = $1 RETURNING *',

  selectQuestionsWithAnswers: `
  SELECT questions.*, answers.id_answer, answers.answer_text, answers.is_correct
  FROM questions
  LEFT JOIN answers ON questions.id_question = answers.id_question
  WHERE questions.id_lesson = $1 AND type= $2
  ORDER BY questions.lesson_number, answers.id_answer
`,

// en ambas tablas lessons y questions hay type, lo renombro para evitar confusión y problemas en el código
  selectLessonsWithQuestionsAndAnswers: `SELECT lessons.*, questions.id_question, questions.question_text, questions.type AS question_type, 
  answers.id_answer, answers.answer_text, answers.is_correct
  FROM lessons 
  LEFT JOIN questions ON lessons.id_lesson = questions.id_lesson 
  LEFT JOIN answers ON questions.id_question = answers.id_question
  WHERE lessons.id_lesson = $1
  ORDER BY lessons.id_lesson, questions.lesson_number, answers.id_answer `,



  selectProgress: 'SELECT * FROM users_progress ORDER BY id_user_progress',
  insertProgress: 'INSERT INTO users_progress (id_user, id_lesson, completed_at) VALUES ($1, $2, $3 ) RETURNING *',
  // updateProgress: 'UPDATE users_progress SET id_user = $2, id_lesson = $3, completed_at = $4 WHERE id_user_progress = $1 RETURNING * ',
  updateProgress: 'UPDATE users_progress SET is_completed = $2, completed_at = CASE WHEN $2 THEN NOW() ELSE NULL END, score = $3 WHERE id_user_progress = $1 RETURNING *',

  deleteProgress: 'DELETE from users_progress WHERE id_user_progress = $1 RETURNING *',

  countNumberQuestionsById: 'SELECT COUNT(*) FROM questions WHERE id_lesson= $1 ',
  countNumberQuestionsTypeMultipleChoice: 'SELECT COUNT(*) FROM questions WHERE id_lesson= 5 AND "type"= $1',

  selectTypeQuestions: 'SELECT DISTINCT "type" FROM questions',

  selectQuestionsByTypeAndId: 'SELECT * FROM questions WHERE type = $1 AND id_lesson = $2'
  // selectQuestionsByTypeAndIdWithAnswers:'SELECT questions.*, answers.id_answer, answers.answer_text, answers.is_correct FROM questions LEFT JOIN answers ON questions.id_question = answers.id_question WHERE questions.type = $1 AND questions.id_lesson = $2 ORDER BY questions.lesson_number, answers.id_answer'
}

module.exports = queries

