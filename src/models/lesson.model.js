const { pool } = require('../config/pool')

const {selectAllLessons, selectLessonId, insertQuestion, selectQuestionId, insertLesson, updateLesson, deleteLesson, insertAnswer, updateQuestion, deleteQuestion, updateAnswer, deleteAnswer, selectQuestionsWithAnswers, selectLessonsWithQuestionsAndAnswers} = require('./queries')


const getLessonsFromDB = async () => {

  try{

    //traemos todas las lecciones ordenadas por su id
    const result = await pool.query(selectAllLessons)
    // console.log(result.rows)
    //retornamos las filas de las lecciones(un array de objetos)
    return result.rows

  }catch(error){
    //le mostramos el error al administrador
    console.log(error)
    //le mandamos el error al controlador getAllLessons
    throw error;

  }
  
}


const getLessonByIdFromDB = async (id) => {

  try{

    //hacemos la consulta a la bbdd para que nos devuelva la lección según su id 
    const result = await pool.query(selectLessonId, [id])
    //retornamos el objeto con la lección
    return result.rows[0]

  }catch(error){

    //le mostramos el error al admin.
    console.log(error);
    //le mandamos el error al controlador getLessonById
    throw error 

  }
    
}

const createQuestionfromDB = async(id_question, id_lesson, question_text, type) => {
  try{

    //insertamos una nueva lección en la bbdd que contenga las filas para el id, para el texto de la pregunta, el tipo y la posicion de la pregunta
    //El RETURNING * lo usamos para que despues de haber creado la pregunta nos la muestre, sino nosotros no podemos ver que ha pasado. 
    //El segundo argumento de la query son los parametros que utilizamos para evitar la inyección de código junto con el $
    const result = await pool.query(insertQuestion, [id_lesson, question_text, type])

    //devolvemos el objeto con la leccion creada
    return result.rows[0]

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador createLesson
    throw error;

  }
}




const createAnswerfromDB = async( id_question, answer_text, is_correct) => {
  try{

    //insertamos una nueva respuesta en la bbdd que contenga las filas para el id, para el texto de la respuesta, y si es correcta o no con un booleano
    //El RETURNING * lo usamos para que despues de haber creado la respuesta nos la muestre, sino nosotros no podemos ver que ha pasado. 
    //El segundo argumento de la query son los parametros que utilizamos para evitar la inyección de código junto con el $
    const result = await pool.query(insertAnswer, [id_question, answer_text, is_correct])

    console.log(id_question, answer_text, is_correct)

    //devolvemos el objeto con la leccion creada
    return result.rows[0]

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador createLesson
    throw error;

  }
}




const updateAnswerfromDB = async(id, id_question, answer_text, is_correct) =>{

  try{
    
    //actualizamos la leccion en la bbdd.
    //El segundo argumento de la query, los parametros marcados, sirven para que junto con el $ podamos evitar la inyección de código
    //RETURNING * actúa como el select y te muestra las filas actualizadas
     const result = await pool.query(updateAnswer , [id, id_question, answer_text, is_correct]);

     //devolvemos el objeto con la lección actualizada
     return result.rows[0];

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador updateLesson
    throw error;
  }
}




const deleteAnswerfromDB = async(answerId) =>{
  try{

    //eliminamos una lección de la bbdd 
    //Usamos el RETURNING * para que luego rowCount sepa cuantas filas se han eliminado 
    const result = await pool.query(deleteAnswer, [answerId])
    //para saber cuantas filas se han borrado 
    return result.rowCount

  }catch(error){

    //Le mostramos el error al admin.
    console.log(error)

    //Le mandamos el error al controlador deleteLesson
    throw error;
  }
}




const getQuestionsWithAnswersFromDB = async(lessonId) => {
  try{

    //hacemos la consulta a la bb para que nos devuelva las preguntas 
    const result = await pool.query(selectQuestionsWithAnswers, [lessonId])

    const questionsMap = {}
    result.rows.forEach(row => {
      if (!questionsMap[row.id_question]) {
        questionsMap[row.id_question] = {
          id_question: row.id_question,
          question_text: row.question_text,
          type: row.type,
          answers: []
        }
      }
      if (row.id_answer) {
        questionsMap[row.id_question].answers.push({
          id_answer: row.id_answer,
          answer_text: row.answer_text,
          is_correct: row.is_correct
        })
      }
    })

    return Object.values(questionsMap)

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador getQuestionsByLesson para que lo gestione
    throw error;

  }
}

const getLessonsWithQuestionsAndAnswersfromDB = async() => {

  try{

    const result = await pool.query(selectLessonsWithQuestionsAndAnswers)

    const lessonsMap = {};

    result.rows.forEach(row => {

      if (!lessonsMap[row.id_lesson]) {
        lessonsMap[row.id_lesson] = {
          id_lesson: row.id_lesson,
          title: row.title,
          type: row.type,         
          level: row.level,
          is_published: row.is_published,
          questions: []           
        };
      }

      if (row.id_question) {

        let question = lessonsMap[row.id_lesson].questions.find(q => q.id_question === row.id_question);

        if (!question) {
          question = {
            id_question: row.id_question,
            question_text: row.question_text,
            type: row.question_type, 
            answers: []              
          };
          lessonsMap[row.id_lesson].questions.push(question);
        }

        if (row.id_answer) {
          question.answers.push({
            id_answer: row.id_answer,
            answer_text: row.answer_text,
            is_correct: row.is_correct
          });
        }
      }
    });

    return Object.values(lessonsMap);

  }catch(error){

    console.log(error)
    throw error;

  }

}




const getQuestionsFromDB = async(lessonId) => {
  try{

    //hacemos la consulta a la bb para que nos devuelva las preguntas 
    const result = await pool.query(selectQuestionId, [lessonId])

    //retornamos el array con los objetos que contienen las preguntas
    return result.rows

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador getQuestionsByLesson para que lo gestione
    throw error;

  }
}


const createLessonfromDB = async(id_lesson, title, level, type, is_published) => {
  try{

    //insertamos una nueva lección en la bbdd que contenga las filas para el id, para el titulo, el nivel, el tipo de leccion y si está o no publicada. 
    //El RETURNING * lo usamos para que despues de haber creado la leccion nos la muestre, sino nosotros no podemos ver que ha pasado. 
    //El segundo argumento de la query son los parametros que utilizamos para evitar la inyección de código junto con el $
    const result = await pool.query(insertLesson, [title, level, type, is_published])

    //devolvemos el objeto con la leccion creada
    return result.rows[0]

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador createLesson
    throw error;

  }
}


const updateLessonfromDB = async(id, title, level, type, is_published) =>{

  try{
    
    //actualizamos la leccion en la bbdd.
    //El segundo argumento de la query, los parametros marcados, sirven para que junto con el $ podamos evitar la inyección de código
    //RETURNING * actúa como el select y te muestra las filas actualizadas
     const result = await pool.query(updateLesson , [id, title, level, type, is_published]);

     //devolvemos el objeto con la lección actualizada
     return result.rows[0];

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador updateLesson
    throw error;
  }
}


const deleteLessonfromDB = async(lessonId) =>{
  try{

    //eliminamos una lección de la bbdd 
    //Usamos el RETURNING * para que luego rowCount sepa cuantas filas se han eliminado 
    const result = await pool.query(deleteLesson, [lessonId])
    //para saber cuantas filas se han borrado 
    return result.rowCount

  }catch(error){

    //Le mostramos el error al admin.
    console.log(error)

    //Le mandamos el error al controlador deleteLesson
    throw error;
  }
}



const updateQuestionfromDB = async(id, id_lesson, question_text, type) =>{

  try{
    
    //actualizamos la leccion en la bbdd.
    //El segundo argumento de la query, los parametros marcados, sirven para que junto con el $ podamos evitar la inyección de código
    //RETURNING * actúa como el select y te muestra las filas actualizadas
     const result = await pool.query(updateQuestion , [id, id_lesson, question_text, type]);

     //devolvemos el objeto con la lección actualizada
     return result.rows[0];

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador updateLesson
    throw error;
  }
}




const deleteQuestionfromDB = async(questionId) =>{
  try{

    //eliminamos una lección de la bbdd 
    //Usamos el RETURNING * para que luego rowCount sepa cuantas filas se han eliminado 
    const result = await pool.query(deleteQuestion, [questionId])
    //para saber cuantas filas se han borrado 
    return result.rowCount

  }catch(error){

    //Le mostramos el error al admin.
    console.log(error)

    //Le mandamos el error al controlador deleteLesson
    throw error;
  }
}


module.exports = {
    getLessonsFromDB,
    getLessonByIdFromDB,
    createQuestionfromDB,
    getQuestionsFromDB,
    createLessonfromDB,
    updateLessonfromDB,
    deleteLessonfromDB,
    createAnswerfromDB,
    deleteQuestionfromDB,
    updateQuestionfromDB,
    updateAnswerfromDB,
    deleteAnswerfromDB,
    getQuestionsWithAnswersFromDB,
    getLessonsWithQuestionsAndAnswersfromDB
}