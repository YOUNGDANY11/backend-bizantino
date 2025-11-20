const express = require('express')
const router = express.Router()


const userController = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol Admin
 */
router.get('/', auth,role('Admin'),userController.getAll)


/**
 * @swagger
 * /api/users/active:
 *   get:
 *     summary: Obtener el usuario autenticado (perfil propio)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/active',auth,userController.getByUserActive)
/**
 * @swagger
 * /api/users/id/{id}:
 *   get:
 *     summary: Obtener usuario por ID (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol Admin
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/id/:id', auth,role('Admin'),userController.getById)

/**
 * @swagger
 * /api/users/email:
 *   get:
 *     summary: Obtener usuario por email (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol Admin
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/email', auth,role('Admin'),userController.getByEmail)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol Admin
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', auth,role('Admin'),userController.deleteUser)

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Actualizar dirección del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "Calle Principal 123"
 *               city:
 *                 type: string
 *                 example: "Bogotá"
 *               phone_number:
 *                 type: string
 *                 example: "+573001234567"
 *               document_type:
 *                 type: string
 *                 example: "CC"
 *               document_number:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Dirección actualizada exitosamente
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Error en los datos enviados
 */
router.put('/',auth,userController.update_address)

module.exports = router