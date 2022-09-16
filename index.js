const express = require('express');
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config');
const path = require('path')

const app = express();

dbConnection()

// CORS
app.use(cors())

app.use(express.static('public'))

// Lectura y Parseo del body

app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})