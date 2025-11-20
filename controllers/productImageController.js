const imageModel = require('../models/productImageModel')
const fs = require('fs')
const path = require('path')

const create = async(req,res)=>{
    try {
        const { id} = req.params
        const id_product = id
        if(!req.file){
            return res.status(400).json({
                status:'Error',
                mensaje:'No se recibió archivo de imagen'
            })
        }

        const imageRelativePath = `uploads/${req.file.filename}`
        const newImage = await imageModel.create(id_product, imageRelativePath)
        return res.status(201).json({
            status:'Success',
            mensaje:'Imagen creada exitosamente',
            imagen: newImage
        })
    } catch(error) {
        return res.status(500).json({
            status:'Error',
            mensaje: 'No se pudo subir la imagen'
        })
    }
}

const getByProductId = async(req,res)=>{
    try {
        const { id } = req.params
        const id_product = id
        const images = await imageModel.getByProductId(id_product)
        if(images.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay imágenes para este producto'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            imagenes: images
        })
    } catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje: 'Error interno del servidor'
        })
    }
}

const deleteImage = async(req,res)=>{
    try {
        const { id } = req.params
        const image = await imageModel.deleteImage(id)
        if(!image){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe esta imagen'
            })
        }

        // image.image_url contiene algo como 'uploads/123-nombre.png'
        const absolutePath = path.join(__dirname,'..', image.image_url)
        try {
            if(fs.existsSync(absolutePath)){
                fs.unlinkSync(absolutePath)
            }
        } catch(fileErr){
            // Log interno, no romper respuesta principal
            console.error('Error eliminando archivo físico:', fileErr.message)
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Imagen eliminada exitosamente',
            imagen: image
        })
    } catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje: 'No se pudo eliminar la imagen'
        })
    }
}
module.exports = {
    create,
    getByProductId,
    deleteImage
}
