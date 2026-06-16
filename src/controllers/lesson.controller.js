const { pool } = require('../config/pool');
const { getLessonsFromDB, getQuestionsFromDB, createLessonfromDB, updateLessonfromDB, deleteLessonfromDB  } = require('../models/lesson.model')



const getAllLessons = async (req, res) => {

  try {

    const lessons = await getLessonsFromDB();

    return res.status(200).json({
      ok: true,
      message: "All lessons gotten",
      lessons
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })

  }

}



const getLessonById = async (req, res) => {
  try {

    const lessonId = await getLessonByIdFromDB();

    if (resp.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Lesson not found"
      });
    }

    res.status(200).json({
      ok: true,
      message: "Lesson by id gotten",
      lessonId
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Server error"
    });

  }

}



const getQuestionsByLesson = async(req, res) => {


  try{

    //luego recoger preguntas por leccion

     const {id} = req.params

    const questions = await getQuestionsFromDB(id)


    if(questions.length === 0){
      return res.status(404).json({
        ok:false,
        message: "question not found"
      })
    }

    return res.status(200).json({
      ok:true,
      message: "Question gotten correctly",
      questions
    });

  }catch(error){
    console.log(error)
    return res.status(500).json({
      ok:false,
      message: "Server error"
    })
  }

}



const createLesson = async(req, res) => {

  try{

    const {id_lesson, title, level, type, is_published} = req.body;

    const createLessonInDB = await createLessonfromDB(id_lesson ,title, level, type, is_published)

    return res.status(200).json({
      ok:true,
      message:"lesson created successfully",
      createLessonInDB
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      ok:false,
      message:"Server error"
    })
  }

}



const updateLesson = async(req, res) => {

  try {

    const {id} = req.params;
    const {title, level, type, is_published} = req.body;

    const updatedLessonInDB = await updateLessonfromDB(id ,title, level, type, is_published)


    //false, null, unidefined
    if(!updatedLessonInDB){
      return res.status(404).json({
        ok:false,
        message: "Lesson not found in database"
      })
    }

    return res.status(200).json({
      ok:true,
      message:"Lesson updated successfully",
      updatedLessonInDB

    })
    
  }catch(error){
    console.log(error)
    res.status(500).json({
      ok:false,
      message:"Server error"
    })

  }

}



const deleteLesson = async(req, res) => {

  try{

    const {id: lessonId} = req.params;

    const result = await deleteLessonfromDB(lessonId);

    if(result === 0){
      return res.status(404).json({
        ok:false,
        message:"lesson in database not found"
      })
    }

    return res.status(200).json({
      ok:true,
      message: "lesson deleted from database successfully"
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
  getAllLessons,
  getLessonById,
  getQuestionsByLesson,
  createLesson,
  updateLesson,
  deleteLesson
}