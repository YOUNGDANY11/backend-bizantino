const userModel = require('../models/userModel')

const getAll = async(req,res)=>{
    try{
        const users = await userModel.getAll()

        if(users.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay usuarios registrados'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuarios: users
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'no se pudo obtener los usuarios'
        })
    }
}


const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id
        const user = await userModel.getById(id_user)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no existe'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario: user
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'no se pudo obtener los usuarios'
        })
    }
}


const getByEmail = async(req,res)=>{
    try{
        const {email} = req.body
        if(!email){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el correo'
            })
        }
        const user = await userModel.getEmails(email)
        if(user.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay correos registrados con estas caracteristicas'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el usuario'
        })
    }
}

const update_address = async(req,res)=>{
    try{
        const id_user = req.user.id
        const {address} = req.body
        if(!address){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida la direccion'
            })
        }

        const existsUser = await userModel.getById(id_user)
        if(!existsUser){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este usuario'
            })
        }

        const user = await userModel.update_address(address,id_user)
        return res.status(200).json({
            status:'Success',
            mensaje:'Actualizacion exitosa',
            usuario:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo actualizar la direccion'
        })
    }
}

const deleteUser = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id

        const existsUser = await userModel.getById(id_user)
        if(!existsUser){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este usuario'
            })
        }

        const user = await userModel.deleteUser(id_user)
        return res.status(200).json({
            status:'Success',
            mensaje:'Usuario eliminado con exito',
            usuario:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar el usuario'
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByEmail,
    update_address,
    deleteUser
}