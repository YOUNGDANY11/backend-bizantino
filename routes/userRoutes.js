const express = require('express')
const router = express.Router()


const userController = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

//Admin
router.get('/', auth,role('Admin'),userController.getAll)
router.get('/id/:id', auth,role('Admin'),userController.getById)
router.get('/email', auth,role('Admin'),userController.getByEmail)
router.delete('/:id', auth,role('Admin'),userController.deleteUser)


//Cliente
router.put('/',auth,userController.update_address)
module.exports = router