const queries = {

  selectUser: 'SELECT * FROM users WHERE email = $1',
  insertUser: 'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
  selectUserId: 'SELECT id_user, name, email FROM users WHERE id_user = $1',

  selectAllLessons: 'SELECT * FROM lessons ORDER BY id_lesson',
  selectLessonId: 'SELECT * FROM lessons WHERE id_lesson = $1',
  selectQuestionId: 'SELECT * FROM questions WHERE id_lesson= $1',
  insertLesson: 'INSERT INTO lessons (id_lesson, title, level, type, is_published) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  updateLesson: 'UPDATE lessons SET title = $2, level = $3, type = $4, is_published = $5 WHERE id_lesson = $1 RETURNING * ',
  deleteLesson: 'DELETE from lessons WHERE id_lesson = $1 RETURNING *'
}





module.exports = queries

