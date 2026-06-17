//importamos jtw para poder usarlo 
// const jwt = require ('jsonwebtoken')
//importamos las funciones creadas en el modelo desestructuradas para poder usarlas en el controlador
const { getUserByEmail, createUser, getUserById, verifyUserPassword } = require('../models/auth.model')
//importamos el archivo generateToken para poder generar un token cuando el usuario se registre
const generateToken = require ('../utils/generateToken')



//función LOGIN
const getUserEmail = async(req, res) => {

  try{

    //recogemos el email del formulario 
    const {email, password} = req.body;

    //le pasamos a la funcion getUserByEmail el email del formulario para que vaya a la BBDD y busque al usuario que existe con ese email. 
    //Si existe el usuario el objeto con sus datos se guarda en la variable userEmail, si no existe se guardará un "undefined".
    const userEmail = await getUserByEmail(email);

    //Si el usuario con ese email no existe en la bbdd...
    if(!userEmail){
      //devuelve un "error 404" con el mensaje "no se encontró al usuario"
      return res.status(404).json({
          ok:false,
          message:"invalid credentials"
        });
      }

      console.log("usuario en login", userEmail)

    const verificationPassword = await verifyUserPassword(password, userEmail.password)

    if(!verificationPassword){
      return res.status(403).json({
        ok:false,
        message:"invalid credentials"
      })
    }

    // console.log(verificationPassword)


    //Si el usuario con ese email existe en la bbdd, retorna el estado de respuesta 200 para indicar que odo ha ido bien, 
    // el mensaje "usuario encontrado" y el objeto con el usuario de ese email que almacenamos en la línea 15
    return res.status(200).json({
      ok:true,
      message:"user gotten by their email correctly",
      userEmail
    })


  }catch(error){

    //Si ha habido un fallo en la conexión, muéstrale el error al administrador
    console.log(error)

    //Y devuelve el "error 500" con el mensaje "error de servidor"
    return res.status(500).json({
      ok:false,
      message:"Server error"
    })

  }
}


//función SIGNUP 
const createUserInDB = async(req, res) => {

  try{

    //recogemos del fomrulario el nombre, el email y la contraseña que el usuario ha escrito en el formulario
    const {name, email, role, password} = req.body;

    //comprobamos si ya existe un usuario con ese email en la bbdd

    const user = await getUserByEmail(email)


    //Ya existe: error "ya existe el usuario"
    //No existe: encriptar la contraseña  y guardar el usuario con la contraseña hasheada en la bbdd

    //Si ya existe, devolvemos un "error 403" forbidden y el mensaje "el usuario con ese email ya existe en la bbdd"
    if(user){
      return res.status(403).json({
        ok:false,
        message:"user already exists in database"
      })
    }

    //a la función que se encarga de crear un nuevo usuario le pasamos el nombre, el email y la contraseña que hemos recogido del formulario 
    // y almacenamos en userCreated el objeto con el nuevo usuario con los datos del formulario
    const userCreated = await createUser(name, email, role, password)
    
    //Generar el token para el usuario registrado

    const token = generateToken(userCreated)

    //retornar el status 201 y el objeto con el user y el token

    return res.status(201).json({
      ok:true,
      message:"user created correctly",
      userCreated,
      token
    })



  }catch(error){

    //le mostramos el error al admin.
    console.log(error)

    //Si ha habido un fallo en la conexión retornamos un "error 500" y el mensaje "error del servidor"
    return res.status(500).json({
      ok:false,
      message:"Server error"
    })

  }
}

const getUserId = async(req, res) => {

  try{

    //Recogemos de la URL del login el id del usuario 
    const {id_user} = req.params

    //le pasamos ese id a la funcion que busca al usuario con ese id en la bbdd y almacenamos la respuesta en la variable userId
    const userId = await getUserById(id_user);

    //Si el usuario con ese id no existe en la bbdd, retornamos un "error 404" y el mensaje "el usuario con el id indicado no existe en la bbdd"
    if(!userId){
      return res.status(404).json({
        ok:false,
        message: "user not found"
      })
    }

    //Si el usuario con ese id existe en la bbdd devolvemos un estado de respuesta 200 para indicar que todo ha ido bien, el mensaje "usuario encontrado" y el usuario con ese id 
    res.status(200).json({
      ok:true,
      message: "user gotten correctly",
      userId
    })

  }catch(error){

    //en caso de que haya habido un error de conexion, le mostramos el error al administrador
    console.log(error);

    //y devolvemos el "error 500" con el mensaje "error de servidor"
    return res.status(500).json({
      ok:false,
      message:"Server error"
    })

  }
}

//exportamos las funciones creadas para poder usarlas en otros archivos 
module.exports = {

  getUserEmail,
  createUserInDB,
  getUserId

}