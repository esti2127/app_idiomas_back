

//Para que las variables estén accesibles con process.env. Así evitamos dejar a la vista datos sensibles
require('dotenv').config();
// Requerimos express para crear el servidor web, definir rutas, middlewares y manejar las peticiones y las respuestas de forma sencilla
const express = require('express');
//Importamos las rutas del signup ...
const authRouter = require('./routes/auth.routes');
//y del login
const lessonRouter = require('./routes/lesson.routes');
//y del progreso
const progressRouter = require('./routes/progress.routes');
//Requerimos las cors para que solo se permitan peticiones del front y que si otro origen intenta acceder a la API le bloquee la entrada
const cors = require('cors');

//crea la instancia de la aplicación Express. Sin esto no habría objeto sobre el que configurarlo todo. Todo lo que viene en el app.js (cors, middlewares, rutas, listen) se cuelga de app. 
const app = express();



//Cors
app.use(cors({ origin: 'http://localhost:3000' }))

//middlewares
app.use(express.json());

//Ruta general para registro y login
app.use('/api/auth', authRouter)
//Ruta general para lecciones
app.use('/api/lessons', lessonRouter)
// app.use('/api/progress', progressRoutes)




const PORT = process.env.PORT || 3000;
//arrancamos el servidor y lo ponemos a la escucha o en el puerto del .env o sino en el 3000
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})