const express = require('express')
const router = express.Router()


const productController = require('../controllers/productController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestión de productos
 */

/**
 * @swagger
 * /api/products/:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/',productController.getAll)

/**
 * @swagger
 * /api/products/id/{id}:
 *   get:
 *     summary: Obtener un producto por ID (con imágenes, evaluaciones y comentarios)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalle del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductWithExtras'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/id/:id',productController.getById)

/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/',auth,role('Admin'),productController.create)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.put('/:id',auth,role('Admin'),productController.update)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado
 */
router.delete('/:id',auth,role('Admin'),productController.deleteProduct)



/**
 * @swagger
 * /api/products/name:
 *   get:
 *     summary: Buscar productos por nombre
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto (búsqueda parcial)
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/name',productController.getByName)

/**
 * @swagger
 * /api/products/size:
 *   get:
 *     summary: Buscar productos por talla
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         required: true
 *         description: Talla del producto
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/size',productController.getBySize)

/**
 * @swagger
 * /api/products/tipe:
 *   get:
 *     summary: Buscar productos por tipo
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: tipe
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de producto
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/tipe',productController.getByTipe)



/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id_product:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         size:
 *           type: string
 *         tipe:
 *           type: string
 *         quantity:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         size:
 *           type: string
 *         tipe:
 *           type: string
 *         quantity:
 *           type: integer
 *     ProductImage:
 *       type: object
 *       properties:
 *         id_image:
 *           type: integer
 *         image_url:
 *           type: string
 *     ProductEvaluation:
 *       type: object
 *       properties:
 *         id_product_evaluation:
 *           type: integer
 *         id_user:
 *           type: integer
 *         user_name:
 *           type: string
 *         user_lastname:
 *           type: string
 *         assessment:
 *           type: integer
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     ProductComment:
 *       type: object
 *       properties:
 *         id_comment:
 *           type: integer
 *         id_user:
 *           type: integer
 *         user_name:
 *           type: string
 *         user_lastname:
 *           type: string
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     ProductWithExtras:
 *       allOf:
 *         - $ref: '#/components/schemas/Product'
 *         - type: object
 *           properties:
 *             images:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductImage'
 *             evaluations:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductEvaluation'
 *             comments:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductComment'
 */

module.exports = router