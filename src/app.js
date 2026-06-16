const express = require('express');
const authRoutes = require('./routes/auth.routes');
const lessonRoutes = require('./routes/lesson.routes');
const progressRoutes = require('./routes/progress.routes');
const cors = require('cors');
require('dotenv').config();



const app = express();



//Cors
app.use(cors({ origin: 'http://localhost:3000' }))

//middlewares
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/lessons', lessonRoutes)
// app.use('/api/progress', progressRoutes)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})