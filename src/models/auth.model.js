const pool = require('../config/pool')


const getUserByEmail = async (email) => {
  
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    // console.log(result.rows)
   
    return result.rows[0]
}



const createUser = async (name, email, password) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    )
    return result.rows[0]
}




const getUserById = async (id) => {
  
    const result = await pool.query('SELECT id_user, name, email FROM users WHERE id_user = $1', [id])
    // console.log(result.rows)
   
    //rows[0] para que en lugar de devolver el array con el objeto encontrado, devuelva directamente el objeto sin el array. 
    //PROBAR QUE DEVOLVERÍA SI HACEMOS UNA CONSULTA A UN USUARIO CON UN ID QUE NO EXISTE EN LA BASE DE DATOS: NULL O UNDEFINED?
    return result.rows[0]
}

module.exports = {
    getUserByEmail, 
    createUser, 
    getUserById
}