const { pool } = require('../config/pool')



const getLessonsFromDB = async () => {

  try{

    //traemos todas las lecciones ordenadas por su id
    const result = await pool.query('SELECT * FROM lessons ORDER BY id_lesson')
    // console.log(result.rows)
    //retornamos las filas de las lecciones(un array de objetos)
    return result.rows

  }catch(error){

    console.log(error)
    throw error;

  }
  
}




const getLessonByIdFromDB = async (id) => {

  try{

    const result = await pool.query('SELECT * FROM lessons WHERE id_lesson = $1', [id])
    return result.rows[0]

  }catch(error){

    console.log(error);
    throw error 

  }
    
}







const getQuestionsFromDB = async(lessonId) => {
  try{

    const result = await pool.query('SELECT * FROM questions WHERE id_lesson= $1', [lessonId])

    return result.rows

  }catch(error){

    console.log(error)
    throw error;

  }


  
}







const createLessonfromDB = async(id_lesson, title, level, type, is_published) => {
  try{

    const result = await pool.query('INSERT INTO lessons (id_lesson, title, level, type, is_published) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id_lesson, title, level, type, is_published])

    return result.rows[0]

  }catch(error){
    console.log(error)
    throw error;

  }
}


const updateLessonfromDB = async(id, title, level, type, is_published) =>{

  try{

     const result = await pool.query('UPDATE lessons SET title = $2, level = $3, type = $4, is_published = $5 WHERE id_lesson = $1 RETURNING * ' , [id, title, level, type, is_published]);

     return result.rows[0];

  }catch(error){
    console.log(error)
    throw error;
  }

}



const deleteLessonfromDB = async(lessonId) =>{
  try{

    const result = await pool.query('DELETE from lessons WHERE id_lesson = $1 RETURNING *', [lessonId])
    //para saber cuantas filas se han borrado 
    return result.rowCount

  }catch(error){
    console.log(error)
    throw error;
  }
}

module.exports = {
    getLessonsFromDB,
    getQuestionsFromDB,
    createLessonfromDB,
    updateLessonfromDB,
    deleteLessonfromDB
}