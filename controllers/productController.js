const productModel = require('../models/productsModel')

const getAll = async(req,res)=>{
    try{
        const products = await productModel.getAll()

        if(products.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay usuarios registrados'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            productos: products
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los productos'
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_product = id

        const product = await productModel.getById(id_product)
        if(!product){
            return res.status(404).json({
                status:'Error',
                mensaje:'no existe este producto'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            producto: product
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'no se pudo obtener el producto'
        })
    }
}

const getByName = async(req,res)=>{
    try{
        const {name} = req.body
        if(!name) {
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el nombre del producto'
            })
        }

        const product = await productModel.getByName(name)
        if(product.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay productos con este nombre'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            producto: product
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el producto'
        })
    }
}


const getBySize = async(req,res)=>{
    try{
        const {size} = req.body
        if(!size) {
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida la talla'
            })
        }

        const product = await productModel.getBySize(size)
        if(!product){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay productos con esta talla'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            producto: product
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el producto'
        })
    }
}


const getByTipe = async(req,res)=>{
    try{
        const {tipe}= req.body
        if(!tipe){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el tipo del producto'
            })
        }

        const product = await productModel.getByTipe(tipe)
        if(!product){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay productos de este tipo'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            producto:product
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el producto'
        })
    }
}

const create = async(req,res)=>{
    try{    
        const {name,description,size,tipe,quantity} = req.body
        if(!name || !description || !size || !tipe || !quantity){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const product = await productModel.create(name,description,size,tipe,quantity)
        return res.status(200).json({
            status:'Success',
            mensaje:'Producto creado con exito',
            producto: product
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear el producto'
        })
    }
}

const update = async(req,res)=>{
    try{
        const {id} = req.params
        const id_product = id
        const {name,description,size,tipe,quantity} = req.body
        if(!name || !description || !size || !tipe || !quantity){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsProduct = await productModel.getById(id_product)
        if(!existsProduct){
            return res.status(404).json({
                status:'Error',
                mensaje:'Producto no existe'
            })
        }
        const product = await productModel.update(name,description,size,tipe,quantity,id_product)
        return res.status(200).json({
            status:'Error',
            mensaje:'Actualizacion exitosa',
            producto:product
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo actualizar el producto'
        })
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const id_product = id
        const existsProduct = await productModel.getById(id_product)
        if(!existsProduct){
            return res.status(404).json({
                status:'Error',
                mensaje:'Producto no existe'
            })
        }

        const product = await productModel.deleteProduct(id_product)
        return res.status(200).json({
            status:'Success',
            mensaje:'Producto eliminado con exito',
            producto:product
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar este producto'
        })
    }
}
module.exports = {
    getAll,
    getById,
    getByName,
    getBySize,
    getByTipe,
    create,
    update,
    deleteProduct
}