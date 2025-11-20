const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               lastname:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               address:
 *                 type: string
 *                 example: Calle Principal 123
 *               city:
 *                 type: string
 *                 example: Bogotá
 *               document_type:
 *                 type: string
 *                 example: CC
 *               document_number:
 *                 type: string
 *                 example: 1234567890
 *               phone_number:
 *                 type: string
 *                 example: "+573001234567"

 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */
router.post('/register', authController.register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', authController.login)

module.exports = router