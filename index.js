const express = require('express')
const cors = require('cors')
require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

//Importaciones de modulos
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const commentsRoutes = require('./routes/commentsRoutes')
const imageRoutes = require('./routes/imageRoutes')
const evaluationsRoutes = require('./routes/evaluationsRoutes')
const cartRoutes = require('./routes/cartRoutes')


const app = express()
const PORT = process.env.PORT || 3000

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bizantino Boutique API',
            version: '1.0.0',
            description: 'API para la gestión de la boutique Bizantino',
            contact: {
                name: 'Bizantino Boutique'
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


//endpoints
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/comments',commentsRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/evaluations', evaluationsRoutes)
app.use('/api/cart', cartRoutes)



app.listen(PORT, ()=>{
    console.log(`Server corriendo en el puerto ${PORT}`)
})