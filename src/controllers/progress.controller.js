const { getProgressFromDB, createProgressInDB, updateProgressInDB, deleteProgressfromDB } = require('../models/progress.model')

const getAllProgress = async (req, res) => {

  try {

    //await por el retardo
    const progress = await getProgressFromDB();

    const token = req.token
  
    return res.status(200).json({
      ok: true,
      message: "All lessons gotten",
      progress, 
      token
    })

  } catch (error) {

    //le mostramos el error al admin.
    console.log(error)

    //contemplamos el caso "error 500": error del servidor en caso de que al realizar la consulta falle la conexión
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })

  }

}



const createProgress = async(req, res) => {

  try{

    const { id_lesson} = req.body;

    const {id} = req.user

    const createProgressDB = await createProgressInDB( id, id_lesson)

    const token = req.token

    //Si todo va bien...
    return res.status(200).json({
      ok:true,
      message:"progress created successfully",
      createProgressDB,
      token
    })

    //Si ha habido un error del servidor...
  }catch(error){
    console.log(error)
    return res.status(500).json({
      ok:false,
      message:"Server error"
    })
  }

}



const updateProgress = async(req, res) => {

  try {

    //necesitamos el parámetro id que recogemos de la URL para que la BBDD sepa que progreso tiene que actualizar
    const {id} = req.params;
    //del body del objeto desestructuramos las propiedades que necesitamos para que la BBDD sepa con que valores tiene que actualizar el progreso
    const { is_completed, score } = req.body;

    //Llamamos a updateProgressInDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en updatedProgressInDB
    const updatedProgressInDB = await updateProgressInDB(id, is_completed, score)


    //null, undefined
    //Si resulta que el progreso no está en la bbdd...
    if(!updatedProgressInDB){
      return res.status(404).json({
        ok:false,
        message: "Progress not found in database"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok:true,
      message:"Progress updated successfully",
      updatedProgressInDB,
      token

    })
    
  }catch(error){
    console.log(error)
    res.status(500).json({
      ok:false,
      message:"Server error"
    })

  }

}



const deleteProgress = async(req, res) => {

  try{

    //renombramos el id que hemos desestructurado de la URL
    const {id: progressId} = req.params;

    //Llamamos a deleteProgressfromDB y le pasamos el argumento de progressId para que la BBDD sepa que users_progress se tiene que eliminar 
    const result = await deleteProgressfromDB(progressId);

    //Aqui usamos result == 0 porque en el modelo usamos rowCount y nos devuelve un numero. Si ese numero es 0, no hay fila
    if(result == 0){
      return res.status(404).json({
        ok:false,
        message:"progress in database not found"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok:true,
      message: "progress deleted from database successfully",
      token
    })

  }catch(error){

    console.log(error)
    res.status(500).json({
      ok:false,
      message:"Server error"
    })
  }
}



module.exports = {

  getAllProgress,
  createProgress,
  updateProgress,
  deleteProgress
    
}




