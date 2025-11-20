const express = require('express')
const router = express.Router()


const commentsController = require('../controllers/commentsController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')


/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para gestión de comentarios
 */

// ================= ADMIN =================

/**
 * @swagger
 * /api/comments/:
 *   get:
 *     summary: Obtener todos los comentarios (Admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentWithProduct'
 */
router.get('/', auth,role('Admin'),commentsController.getAll)

/**
 * @swagger
 * /api/comments/id/{id}:
 *   get:
 *     summary: Obtener un comentario por ID (Admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Detalle del comentario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentWithProduct'
 *       404:
 *         description: Comentario no encontrado
 */
router.get('/id/:id', auth,role('Admin'),commentsController.getById)

/**
 * @swagger
 * /api/comments/user/{id}:
 *   get:
 *     summary: Obtener comentarios de un usuario (Admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de comentarios del usuario, con información de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentWithProduct'
 */
router.get('/user/:id', auth,role('Admin'),commentsController.getByUserId)

// ================= CLIENTE =================

/**
 * @swagger
 * /api/comments/:
 *   post:
 *     summary: Crear un comentario (Cliente)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comentario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
router.post('/', auth,commentsController.create)

// ========== CLIENTE Y ADMIN =============

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Eliminar un comentario (Cliente o Admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       204:
 *         description: Comentario eliminado
 */
router.delete('/:id', auth,commentsController.deleteComment)



/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id_comment:
 *           type: integer
 *         id_product:
 *           type: integer
 *         id_user:
 *           type: integer
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     CommentInput:
 *       type: object
 *       required:
 *         - id_product
 *         - comment
 *       properties:
 *         id_product:
 *           type: integer
 *         comment:
 *           type: string
 *     CommentWithProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/Comment'
 *         - type: object
 *           properties:
 *             product_name:
 *               type: string
 *             product_description:
 *               type: string
 *             size:
 *               type: string
 *             tipe:
 *               type: string
 */

module.exports = router