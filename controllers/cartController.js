const cartModel = require('../models/cartModel')
const productModel = require('../models/productsModel')
const getCartItems = async(req,res)=> {
    try{
        const id_user = req.user.id
        const cartItems = await cartModel.getCartItems(id_user)
        if(cartItems.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'El carrito esta vacio'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            carrito: cartItems
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'Error',
            mensaje:'No se pudieron obtener los items del carrito'
        })
    }
}

const addToCart = async(req,res)=> {
    try{
        const id_user = req.user.id
        const {id_product, quantity} = req.body
        if(!id_product || !quantity){
            return res.status(400).json({
                status:'Error',
                mensaje:'Faltan datos obligatorios'
            })
        }
        const existsProduct = await productModel.getById(id_product)
        if(!existsProduct){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este producto'
            })
        }
        const existProductInCart = await cartModel.getProductInCart(id_user, id_product)
        if(existProductInCart){
            return res.status(400).json({
                status:'Error',
                mensaje:'El producto ya está en el carrito'
            })
        }
        const newCartItem = await cartModel.addToCart(id_user, id_product, quantity)
        return res.status(201).json({
            status:'Success',
            mensaje:'Item agregado al carrito exitosamente',
            item: newCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'Error',
            mensaje:'No se pudo agregar el item al carrito'
        })
    }
}

const updateCartItem = async(req,res)=> {
    try{
        const {id} = req.params
        const id_cart_item = id
        const {quantity} = req.body 
        if(!quantity){
            return res.status(400).json({
                status:'Error',
                mensaje:'Faltan datos obligatorios'
            })
        }
        const existsCartItem = await cartModel.getById(id_cart_item)
        if(!existsCartItem){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este item en el carrito'
            })
        }
        const updatedCartItem = await cartModel.updateCartItem(id_cart_item, quantity)
        return res.status(200).json({
            status:'Success',
            mensaje:'Item actualizado exitosamente',
            item: updatedCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'Error',
            mensaje:'No se pudo actualizar el item del carrito'
        })
    }
}

const deleteCartItem = async(req,res)=> {
    try{
        const {id} = req.params
        const id_cart_item = id
        const existsCartItem = await cartModel.getById(id_cart_item)
        if(!existsCartItem){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este item en el carrito'
            })
        }
        const deletedCartItem = await cartModel.deleteCartItem(id_cart_item)
        return res.status(200).json({
            status:'Success',
            mensaje:'Item eliminado exitosamente',
            item: deletedCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar el item del carrito'
        })
    }   
}

module.exports = {
    getCartItems,
    addToCart,
    updateCartItem,
    deleteCartItem
}