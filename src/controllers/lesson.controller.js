
const { getLessonsFromDB, getLessonByIdFromDB, createQuestionfromDB, getQuestionsFromDB, createLessonfromDB, updateLessonfromDB, deleteLessonfromDB, createAnswerfromDB, updateQuestionfromDB, deleteQuestionfromDB, updateAnswerfromDB, deleteAnswerfromDB, getQuestionsWithAnswersFromDB, getLessonsWithQuestionsAndAnswersfromDB, getQuestionsNumberById, getTypes, getQuestionsByTypeAndId } = require('../models/lesson.model')


//usamos una función asincrona porque realizar una consulta a la bbdd tiene retardo
const getAllLessons = async (req, res) => {

  try {

    //await por el retardo
    const lessons = await getLessonsFromDB();

    const token = req.token
    //no tenemos en cuenta el caso "error 404" porque realmente podría ser que la bbdd estuviese vacía y entonces nos devolviese un array vacío, y eso no indicaría que hubiese un error.
    //En caso de que todo vaya bien mostramos en un código de respuesta satisfactoria 200, el mensaje "All lessons gotten" y las lecciones que devuelva la bbdd al hacer la consulta
    return res.status(200).json({
      ok: true,
      message: "All lessons gotten",
      lessons,
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



const getLessonById = async (req, res) => {
  try {

    //hacemos la consulta a la bbdd para que nos devuleva la leccion según su id 
    //await porque hay retardo

    const { id } = req.params

    const lessonId = await getLessonByIdFromDB(id);

    //En caso de que lessonId no sea ni null, ni undefined...
    //Antes habías puesto res.rows.length == 0 en el if, pero eso no tiene sentido porque en el modelo te devuelve un objeto, no un array. Y length es una propiedad de los arrays.
    if (!lessonId) {

      //devuelve un "error 404" en formato objeto json con el mensaje "Lesson not found" si el objeto no existe 
      return res.status(404).json({
        ok: false,
        message: "Lesson not found"
      });
    }

    const token = req.token

    //devuelve un código de respuesta 200 en formato json con el mensaje "Lesson by id gotten"
    return res.status(200).json({
      ok: true,
      message: "Lesson by id gotten",
      lessonId,
      token
    })

    //Si el error es del servidor porque la conexión ha fallado...
  } catch (error) {

    //le mostramos el error al admin.
    console.log(error);
    //el estado de la respuesta será un error 500 en formato json y el mensaje que aparecerá será "Server error"
    return res.status(500).json({
      ok: false,
      message: "Server error"
    });

  }
}



const createQuestion = async (req, res) => {

  try {

    //del body requerimos los siguientes argumentos que hemos desestructurado para poder escribirlo todo en una línea de manera más limpia
    const { id_question, id_lesson, question_text, type, lesson_number } = req.body;

    //Llamamos a createLessonfromDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en createLessonInDB
    const createQuestionInDB = await createQuestionfromDB(id_question, id_lesson, question_text, type, lesson_number)

    const token = req.token

    //Si todo va bien...
    return res.status(200).json({
      ok: true,
      message: "question created successfully",
      createQuestionInDB,
      token
    })

    //Si ha habido un error del servidor...
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }

}




const updateQuestion = async (req, res) => {

  try {

    //necesitamos el parámetro id que recogemos de la URL para que la BBDD sepa que leccion tiene que actualizar
    const { id } = req.params;
    //del body del objeto desestructuramos las propiedades que necesitamos para que la BBDD sepa con que valores tiene que actualizar la lección
    const { id_lesson, question_text, type, lesson_number } = req.body;

    //Llamamos a updateLessonfromDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en updatedLessonInDB
    const updatedQuestionInDB = await updateQuestionfromDB(id, id_lesson, question_text, type, lesson_number)


    //null, undefined
    //Si resulta que la leccion no está en la bbdd...
    if (!updatedQuestionInDB) {
      return res.status(404).json({
        ok: false,
        message: "Question not found in database"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok: true,
      message: "Question updated successfully",
      updatedQuestionInDB,
      token

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: "Server error"
    })

  }

}




const deleteQuestion = async (req, res) => {

  try {

    //renombramos el id que hemos desestructurado de la URL
    const { id: questionId } = req.params;

    //Llamamos a deleteLessonfromDB y le pasamos el argumento de lessonId para que la BBDD sepa que lesson se tiene que eliminar 
    const result = await deleteQuestionfromDB(questionId);

    //Aqui usamos result == 0 porque en el modelo usamos rowCount y nos devuelve un numero. Si ese numero es 0, no hay fila
    if (result == 0) {
      return res.status(404).json({
        ok: false,
        message: "question in database not found"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok: true,
      message: "question deleted from database successfully",
      token
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }
}




const createAnswer = async (req, res) => {

  try {

    //del body requerimos los siguientes argumentos que hemos desestructurado para poder escribirlo todo en una línea de manera más limpia
    const { id_question, answer_text, is_correct } = req.body;

    //Llamamos a createLessonfromDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en createLessonInDB
    const createAnswerInDB = await createAnswerfromDB(id_question, answer_text, is_correct)

    const token = req.token

    //Si todo va bien...
    return res.status(200).json({
      ok: true,
      message: "question created successfully",
      createAnswerInDB,
      token
    })

    //Si ha habido un error del servidor...
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }

}





const updateAnswer = async (req, res) => {

  try {

    //necesitamos el parámetro id que recogemos de la URL para que la BBDD sepa que leccion tiene que actualizar
    const { id } = req.params;
    //del body del objeto desestructuramos las propiedades que necesitamos para que la BBDD sepa con que valores tiene que actualizar la lección
    const { id_question, answer_text, is_correct } = req.body;

    //Llamamos a updateLessonfromDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en updatedLessonInDB
    const updatedAnswerInDB = await updateAnswerfromDB(id, id_question, answer_text, is_correct)


    //null, undefined
    //Si resulta que la leccion no está en la bbdd...
    if (!updatedAnswerInDB) {
      return res.status(404).json({
        ok: false,
        message: "Answer not found in database"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok: true,
      message: "Answer updated successfully",
      updatedAnswerInDB,
      token

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: "Server error"
    })

  }

}




const deleteAnswer = async (req, res) => {

  try {

    //renombramos el id que hemos desestructurado de la URL
    const { id: answerId } = req.params;

    //Llamamos a deleteLessonfromDB y le pasamos el argumento de lessonId para que la BBDD sepa que lesson se tiene que eliminar 
    const result = await deleteAnswerfromDB(answerId);

    //Aqui usamos result == 0 porque en el modelo usamos rowCount y nos devuelve un numero. Si ese numero es 0, no hay fila
    if (result == 0) {
      return res.status(404).json({
        ok: false,
        message: "answer in database not found"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok: true,
      message: "answer deleted from database successfully",
      token
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }
}




const getQuestionsWithAnswers = async (req, res) => {


  try {

    //el parámetro requerido para hacer la consulta es el id, en este caso
    const { id } = req.params
    const { type } = req.query

    //Llamamos a la función que se encarga de hacer la consulta y como tiene retardo le ponemos el await delante
    const questionsWithAnswers = await getQuestionsWithAnswersFromDB(id, type || null)

    //Aquí si tiene sentido length porque queremos que nos devuelva todas las preguntas en un array.
    // if (questionsWithAnswers.length == 0) {
    //   //devolvemos un "error 404" en caso de que las preguntas no existan y el mensaje "question not found"
    //   return res.status(404).json({
    //     ok: false,
    //     message: "question with answers not found"
    //   })
    // }
    if (questionsWithAnswers.length == 0) {
      return res.status(200).json({
        ok: true,
        message: "No questions found",
        questionsWithAnswers: []
      })
    }


    //Si todo va bien el estado de la respuesta será el código de respuesta 200 en formato json con el mensaje "Question gotten correctly"
    return res.status(200).json({
      ok: true,
      message: "Question with answers gotten correctly",
      questionsWithAnswers
    });

    //En caso de que la conexión haya fallado y haya un error del servidor mostramos el "error 500" y el mensaje "Server error"
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }

}




const getLessonsWithQuestionsAndAnswers = async (req, res) => {
  try {

    const { id } = req.params
    const lessons = await getLessonsWithQuestionsAndAnswersfromDB(id);

    console.log(id)

    console.log(lessons)


    if (lessons.length === 0) {

      return res.status(404).json({
        ok: false,
        message: "No lessons found in the database"
      });
    }


    return res.status(200).json({
      ok: true,
      message: "Lessons with questions and answers gotten correctly",
      lessons
    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
};





//recogemos las preguntas según la lección 
const getQuestionsByLesson = async (req, res) => {


  try {

    //luego recoger preguntas por leccion

    //el parámetro requerido para hacer la consulta es el id, en este caso
    const { id } = req.params

    //Llamamos a la función que se encarga de hacer la consulta y como tiene retardo le ponemos el await delante
    const questions = await getQuestionsFromDB(id)

    //Aquí si tiene sentido length porque queremos que nos devuelva todas las preguntas en un array.
    if (questions.length == 0) {
      //devolvemos un "error 404" en caso de que las preguntas no existan y el mensaje "question not found"
      return res.status(404).json({
        ok: false,
        message: "question not found"
      })
    }

    //Si todo va bien el estado de la respuesta será el código de respuesta 200 en formato json con el mensaje "Question gotten correctly"
    return res.status(200).json({
      ok: true,
      message: "Question gotten correctly",
      questions
    });

    //En caso de que la conexión haya fallado y haya un error del servidor mostramos el "error 500" y el mensaje "Server error"
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }

}



const createLesson = async (req, res) => {

  try {

    //del body requerimos los siguientes argumentos que hemos desestructurado para poder escribirlo todo en una línea de manera más limpia
    const { id_lesson, title, level, type, is_published } = req.body;

    //Llamamos a createLessonfromDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en createLessonInDB
    const createLessonInDB = await createLessonfromDB(id_lesson, title, level, type, is_published)

    const token = req.token

    //Si todo va bien...
    return res.status(200).json({
      ok: true,
      message: "lesson created successfully",
      createLessonInDB,
      token
    })

    //Si ha habido un error del servidor...
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }

}


//Función asincrona que se encarga de recibir la petición de la bbdd, extraer los datos de params y body, llamar al modelo, gestionar la respuesta del modelo y devolverle la respuesta al cliente
const updateLesson = async (req, res) => {

  try {

    //necesitamos el parámetro id que recogemos de la URL para que la BBDD sepa que leccion tiene que actualizar
    const { id } = req.params;
    //del body del objeto desestructuramos las propiedades que necesitamos para que la BBDD sepa con que valores tiene que actualizar la lección
    const { title, level, type, is_published } = req.body;

    //Llamamos a updateLessonfromDB pasándole los argumentos, esperamos su resultado con await, y guardamos lo que devuelve en updatedLessonInDB
    const updatedLessonInDB = await updateLessonfromDB(id, title, level, type, is_published)


    //null, undefined
    //Si resulta que la leccion no está en la bbdd...
    if (!updatedLessonInDB) {
      return res.status(404).json({
        ok: false,
        message: "Lesson not found in database"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok: true,
      message: "Lesson updated successfully",
      updatedLessonInDB,
      token

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: "Server error"
    })

  }

}



const deleteLesson = async (req, res) => {

  try {

    //renombramos el id que hemos desestructurado de la URL
    const { id: lessonId } = req.params;

    //Llamamos a deleteLessonfromDB y le pasamos el argumento de lessonId para que la BBDD sepa que lesson se tiene que eliminar 
    const result = await deleteLessonfromDB(lessonId);

    //Aqui usamos result == 0 porque en el modelo usamos rowCount y nos devuelve un numero. Si ese numero es 0, no hay fila
    if (result == 0) {
      return res.status(404).json({
        ok: false,
        message: "lesson in database not found"
      })
    }

    const token = req.token

    return res.status(200).json({
      ok: true,
      message: "lesson deleted from database successfully",
      token
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({
      ok: false,
      message: "Server error"
    })
  }
}



const getQuestionsByTypeAndIdfromDB = async (req, res) => {
  try {

    const { id } = req.params

    const { type } = req.query

    const types = await getTypes()

    const questionsWithAnswers = await getQuestionsWithAnswersFromDB(id, type);

    const countResult = await getQuestionsNumberById(id);
    const totalQuestions = Number.parseInt(countResult[0]?.count, 10) || 0;

    if (!types || types.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Question types not found"
      })
    } else {

      const questionsByType = types.map((typeObj) => {
        const typeName = typeObj.type;

        return {
          type: typeName,
          questions: questionsWithAnswers.filter(
            (question) => question.type === typeName
          )
        };
      });

      return res.status(200).json({
        ok: true,
        message: "questions gotten correctly",
        questionsByType,
        totalQuestions
      })
    }

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      ok: false,
      message: "Server error"
    })

  }
}


module.exports = {
  getAllLessons,
  getLessonById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getQuestionsWithAnswers,
  getLessonsWithQuestionsAndAnswers,
  getQuestionsByTypeAndIdfromDB
}