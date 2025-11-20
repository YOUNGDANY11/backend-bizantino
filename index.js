const express = require('express')
const cors = require('cors')
require('dotenv').config()


//Importaciones de modulos
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//endpoints
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server corriendo en el puerto ${PORT}`)
})