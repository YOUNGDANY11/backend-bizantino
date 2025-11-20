const express = require('express')
const router = express.Router()


const productEvaluationModel = require('../controllers/productEvaluationsController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')


/**
 * @swagger
 * tags:
 *   - name: ProductEvaluations
 *     description: Endpoints de evaluaciones de productos
 */

// ================= ADMIN =================

/**
 * @swagger
 * /api/evaluations/:
 *   get:
 *     summary: "[ADMIN] Obtener todas las evaluaciones"
 *     tags:
 *       - ProductEvaluations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductEvaluation'
 */
router.get('/',auth,role('Admin'),productEvaluationModel.getAll)

/**
 * @swagger
 * /api/evaluations/id/{id}:
 *   get:
 *     summary: "[ADMIN] Obtener evaluación por ID"
 *     tags:
 *       - ProductEvaluations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Detalle de la evaluación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEvaluation'
 *       404:
 *         description: Evaluación no encontrada
 */
router.get('/id/:id',auth,role('Admin'),productEvaluationModel.getById)

/**
 * @swagger
 * /api/evaluations/product/{id}:
 *   get:
 *     summary: "[ADMIN] Obtener evaluaciones de un producto"
 *     tags:
 *       - ProductEvaluations
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
 *         description: Lista de evaluaciones del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductEvaluation'
 */
router.get('/product/:id',auth,role('Admin'),productEvaluationModel.getByProductId)

// ================= CLIENTE =================

/**
 * @swagger
 * /api/evaluations/:
 *   post:
 *     summary: "[CLIENTE] Crear evaluación de producto"
 *     tags:
 *       - ProductEvaluations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductEvaluationInput'
 *     responses:
 *       201:
 *         description: Evaluación creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEvaluation'
 */
router.post('/',auth,productEvaluationModel.create)

/**
 * @swagger
 * /api/evaluations/{id}:
 *   delete:
 *     summary: "[CLIENTE] Eliminar evaluación propia"
 *     tags:
 *       - ProductEvaluations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEvaluation'
 *       404:
 *         description: Evaluación no encontrada
 */
router.delete('/:id',auth,productEvaluationModel.deleteEvaluation)


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductEvaluation:
 *       type: object
 *       properties:
 *         id_product_evaluation:
 *           type: integer
 *         id_product:
 *           type: integer
 *         id_user:
 *           type: integer
 *         assessment:
 *           type: integer
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     ProductEvaluationInput:
 *       type: object
 *       required:
 *         - id_product
 *         - assessment
 *       properties:
 *         id_product:
 *           type: integer
 *         assessment:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 */

module.exports = router