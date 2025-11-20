const express = require('express')
const router = express.Router()



const cartController = require('../controllers/cartController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Endpoints para gestión del carrito de compras
 */


/**
 * @swagger
 * /api/cart/:
 *   get:
 *     summary: Obtener los items del carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de items del carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 */
router.get('/', auth, cartController.getCartItems)

/**
 * @swagger
 * /api/cart/:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto agregado al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 */
router.post('/', auth, cartController.addToCart)

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cantidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 */
router.put('/:id', auth, cartController.updateCartItem)

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item del carrito
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 */
router.delete('/:id', auth, cartController.deleteCartItem)


/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id_cart_item:
 *           type: integer
 *         id_cart:
 *           type: integer
 *         id_product:
 *           type: integer
 *         quantity:
 *           type: integer
 *         added_at:
 *           type: string
 *           format: date-time
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         size:
 *           type: string
 *         tipe:
 *           type: string
 *         stock:
 *           type: integer
 *
 */

module.exports = router