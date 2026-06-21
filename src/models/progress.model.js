const { pool } = require('../config/pool')

const {selectProgress, insertProgress, updateProgress, deleteProgress} = require('./queries')

const getProgressFromDB = async () => {

  try{

    const result = await pool.query(selectProgress)
    
    return result.rows

  }catch(error){
    //le mostramos el error al administrador
    console.log(error)
    //le mandamos el error al controlador 
    throw error;

  }
  
}



const createProgressInDB = async(id_user, id_lesson) => {


  try{

    const result = await pool.query(insertProgress, [id_user, id_lesson, null])

    return result.rows[0]

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador 
    throw error;

  }
}



const updateProgressInDB = async(id, is_completed, score) =>{

  try{
    
     const result = await pool.query(updateProgress , [id, is_completed, score]);

     return result.rows[0];

  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //le mandamos el error al controlador 
    throw error;
  }
}



const deleteProgressfromDB = async(progressId) =>{
  try{

    const result = await pool.query(deleteProgress, [progressId])
    //para saber cuantas filas se han borrado 
    return result.rowCount

  }catch(error){

    //Le mostramos el error al admin.
    console.log(error)

    //Le mandamos el error al controlador 
    throw error;
  }
}



module.exports = {

  getProgressFromDB,
  createProgressInDB,
  updateProgressInDB,
  deleteProgressfromDB
    
}