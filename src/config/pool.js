//importamos el pool
const { Pool } = require('pg');
//cargamos las variables de entorno del archivo .env
require('dotenv').config();



// PORT = 3000

// DB_USER=postgres
// DB_HOST=localhost
// DB_NAME=app_idiomas
// DB_PASSWORD=123456
// DB_PORT=5432

//accedemos a las variables (sensibles)

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

//creamos el pool
const pool = new Pool(dbConfig);

//lo del on ya me lía
pool.on('connect', () => {

    console.log('Pool de PostgreSQL lista para servir lecciones');

});

pool.on('error', (error) => {

    console.error('Error en la pool:', error.message);

});

module.exports = { pool };