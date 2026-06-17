const { pool } = require('../config/pool')

const {selectAllLessons, selectLessonId, selectQuestionId, insertLesson, updateLesson, deleteLesson} = require('./queries')


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
    const result = await pool.query(insertLesson, [id_lesson, title, level, type, is_published])

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

module.exports = {
    getLessonsFromDB,
    getLessonByIdFromDB,
    getQuestionsFromDB,
    createLessonfromDB,
    updateLessonfromDB,
    deleteLessonfromDB
}