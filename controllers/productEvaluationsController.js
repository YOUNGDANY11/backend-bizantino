const productEvaluationModel = require('../models/productEvaluationsModel')

const getAll = async(req,res)=>{    
    try{
        const evaluations = await productEvaluationModel.getAll()
        if(evaluations.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay evaluaciones registradas'
            })
        }
        res.status(200).json({
            status:'Success',
            data:evaluations
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al obtener las evaluaciones',
            error:error.message
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params 
        const id_product_evaluation = id
        const evaluation = await productEvaluationModel.getById(id_product_evaluation)
        if(!evaluation){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe esta evaluacion'
            })
        }
        res.status(200).json({
            status:'Success',
            data:evaluation
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al obtener la evaluacion',
            error:error.message
        })
    }
}

const getByProductId = async(req,res)=>{
    try{
        const {id} = req.params 
        const id_product = id
        const evaluations = await productEvaluationModel.getByProductId(id_product)
        if(evaluations.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay evaluaciones para este producto'
            })
        }
        res.status(200).json({
            status:'Success',
            data:evaluations
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al obtener las evaluaciones del producto',
            error:error.message
        })
    }
}

const create = async(req,res)=>{
    try{
        const {id_product, id_user, assessment, comment} = req.body
        if(!id_product || !id_user || !assessment){
            return res.status(400).json({
                status:'Error',
                mensaje:'Faltan datos obligatorios'
            })
        }
        const newEvaluation = await productEvaluationModel.create(id_product, id_user, assessment, comment)
        res.status(201).json({
            status:'Success',
            mensaje:'Evaluacion creada exitosamente',
            data:newEvaluation
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:'Error',
            mensaje:'Error al crear la evaluacion',
            error:error.message
        })
    }
}

const deleteEvaluation = async(req,res)=>{
    try{
        const {id} = req.params
        const id_product_evaluation = id
        const deletedEvaluation = await productEvaluationModel.deleteEvaluation(id_product_evaluation)
        if(!deletedEvaluation){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe esta evaluacion'
            })
        }
        res.status(200).json({
            status:'Success',
            mensaje:'Evaluacion eliminada exitosamente',
            data:deletedEvaluation
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al eliminar la evaluacion',
            error:error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByProductId,
    create,
    deleteEvaluation
}