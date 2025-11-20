const express = require('express')
const router = express.Router()


const productImageController = require('../controllers/productImageController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const upload = require('../middlewares/upload.middleware')


/**
 * @swagger
 * tags:
 *   - name: ProductImages
 *     description: Endpoints de imágenes de productos (solo Admin)
 */

/**
 * @swagger
 * /api/images/{id}:
 *   post:
 *     summary: "[ADMIN] Subir imagen a un producto"
 *     tags:
 *       - ProductImages
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Imagen subida y registrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductImage'
 *       400:
 *         description: No se recibió archivo de imagen
 */
router.post('/:id', auth, role('Admin'), upload.single('image'), productImageController.create)

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     summary: "[ADMIN] Eliminar imagen de producto"
 *     tags:
 *       - ProductImages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductImage'
 *       404:
 *         description: No existe esta imagen
 */
router.delete('/:id', auth, role('Admin'), productImageController.deleteImage)


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductImage:
 *       type: object
 *       properties:
 *         id_image:
 *           type: integer
 *         id_product:
 *           type: integer
 *         image_url:
 *           type: string
 */

module.exports = router