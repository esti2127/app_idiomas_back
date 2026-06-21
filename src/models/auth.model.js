const { pool } = require('../config/pool')
const bcrypt = require('bcryptjs')
const {selectUser, insertUser, selectUserId} = require('./queries')


const getUserByEmail = async (email) => {

    // console.log("getUserByEmail")

    //Hacemos una petición a la bbdd para que nos devuelva la fila del usuario con el email indicado y guardamos el objeto que retorne en result
    //la gestión de la respuesta la hacemos en el controlador
    const result = await pool.query(selectUser, [email])

    // console.log(result.rows)

    //devolvemos el objeto con el usuario con el email indicado 
    return result.rows[0];

}



const createUser = async (name, email, role, password) => {

    //almacenamos la contraseña recogida en el front hasheada
    const hashPassword = await generateUserPassword(password)

    //Guardamos en la tabla users de la bbdd un usuario con el nombre, email y contraseña del front hasheada
    //y nos aseguramos de evitar la inyección de código con el $ e indicando los parámetros anteriores
    const result = await pool.query(
        insertUser,
        [name, email, role, hashPassword]
    )

    //retornams el objeto con el nombre, el email y la contraseña hasheada que hemos almacenado en la bbdd
    return result.rows[0]

}

//creamos una función para hasear la contraseña recogida del front
const verifyUserPassword = async (password, hashPassword) => {

    try {
        const validationPassword = await bcrypt.compare(password, hashPassword)
        // console.log(validationPassword)
        return validationPassword;
    } catch (error) {
        //le mostramos el error al admin.
        console.log(error)
        //le mandamos el error al controlador
        throw error
    }
}

const generateUserPassword = async (password) => {

    try {
        //guardamos la contraseña del front hasheada en la variable generateHashedPassword y le ponemos un límite máximo de 10 caracteres
        const generateHashedPassword = await bcrypt.hash(password, 10)
        //devolvemos la contraseña hasheada
        return generateHashedPassword;

    }catch(error){
        //le mostramos el error al admin
        console.log(error)
        //le mandamos el error al controlador 
        throw error
    }
    
}


module.exports = {
    getUserByEmail,
    createUser,
    verifyUserPassword
}