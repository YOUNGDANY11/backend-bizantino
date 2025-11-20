const express = require('express')
const router = express.Router()


const productImageController = require('../controllers/productImageController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const upload = require('../middlewares/upload.middleware')


router.post('/:id', auth, role('Admin'), upload.single('image'), productImageController.create)
router.delete('/:id', auth, role('Admin'), productImageController.deleteImage)

module.exports = router