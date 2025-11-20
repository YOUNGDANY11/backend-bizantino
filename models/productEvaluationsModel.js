const pool = require('../config/db')

const getAll = async()=>{
    const result = await pool.query('SELECT * FROM product_evaluations')
    return result.rows
}
const getById = async(id_product_evaluation)=>{
    const result = await pool.query('SELECT * FROM product_evaluations WHERE id_product_evaluation = $1',[id_product_evaluation])
    return result.rows[0]
}

const getByProductId = async(id_product)=>{
    const result = await pool.query('SELECT * FROM product_evaluations WHERE id_product = $1',[id_product])
    return result.rows
}

const create = async(id_product,id_user,assessment,comment) =>{
    const result = await pool.query('INSERT INTO product_evaluations (id_product, id_user, assessment, comment) VALUES ($1, $2, $3, $4) RETURNING *',[id_product, id_user, assessment, comment])
    return result.rows[0]
}

const deleteEvaluation = async(id_product_evaluation) =>{
    const result = await pool.query('DELETE FROM product_evaluations WHERE id_product_evaluation =$1 RETURNING *',[id_product_evaluation])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,    
    getByProductId,
    create,
    deleteEvaluation
}
