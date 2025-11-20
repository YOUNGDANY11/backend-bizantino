const commentModle = require('../models/commentsModel')
const { get } = require('../routes/productRoutes')

const getAll = async(req,res)=>{
    try{
        const comments = await commentModle.getAll()
        if(comments.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay comentarios registrados'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            comentarios: comments
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudieron obtener los comentarios'
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_comment = id
        const comment = await commentModle.getById(id_comment)
        if(!comment){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este comentario'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            comentario: comment
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el comentario'
        })
    }   
}

const getByUserId = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id
        const comments = await commentModle.getByUserId(id_user)
        if(comments.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no ha realizado comentarios'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            comentarios: comments
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudieron obtener los comentarios del usuario'
        })
    }
}

const create = async(req,res)=>{
    try{
        const {id_product, id_user, comment} = req.body
        if(!id_product || !id_user || !comment){
            return res.status(400).json({
                status:'Error',
                mensaje:'Faltan datos obligatorios'
            })
        }
        const newComment =  await commentModle.create(id_product, id_user, comment)
        return res.status(201).json({
            status:'Success',
            mensaje:'Comentario creado exitosamente',
            comentario: newComment
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear el comentario'
        })
    }
}

const deleteComment = async(req,res)=>{
    try{
        const {id} = req.params     
        const id_comment = id
        const comment = await commentModle.deleteComment(id_comment)
        if(!comment){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este comentario'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Comentario eliminado exitosamente',
            comentario: comment
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar el comentario'
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    deleteComment
}