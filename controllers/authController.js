const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const register = async(req,res)=>{
    try{
        const {name,lastname,email, address, city, password, document_type, document_number, phone_number, role} = req.body
        if(!name || !lastname || !email || !address || !city || !password || !document_type || !document_number || !phone_number){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const emailExists = await userModel.getByEmail(email)
        if(emailExists){
            return res.status(400).json({
                status:'Error',
                mensaje:'Correo ya registrado'
            })
        }

        const documentExists = await userModel.getByDocumentId(document_number)
        if(documentExists){
            return res.status(400).json({
                status:'Error',
                mensaje:'Numero de documento ya registrado'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create(name,lastname,email, address, city, hashedPassword, document_type, document_number, phone_number, role || "Cliente")
        return res.status(200).json({
            status:'Success',
            mensaje:'Usuario registrado con exito',
            usuario:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo registrar el usuario'
        })
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const user = await userModel.getByEmail(email)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'Correo no registrado'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                status:'Error',
                mensaje:'Contraseña incorrecta'
            })
        }

        const token = await jwt.sign({id:user.id_user,role:user.role,email:user.email,name:user.name}, process.env.JWT_SECRET, {
            expiresIn:'1y'
        })

        return res.status(200).json({
            status:'Success',
            token
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo iniciar sesion'
        })
    }
}
module.exports = {
    login,
    register
}