const pool = require('../config/db')

const getAll = async()=>{
    const query = `
        SELECT 
            pe.*,
            u.name AS user_name,
            u.lastname AS user_lastname,
            u.email AS user_email,
            p.name AS product_name,
            p.description AS product_description,
            p.tipe AS product_tipe,
            p.size AS product_size
        FROM product_evaluations pe
        LEFT JOIN users u ON pe.id_user = u.id_user
        LEFT JOIN products p ON pe.id_product = p.id_product
        ORDER BY pe.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
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
    const existing = await pool.query('SELECT * FROM product_evaluations WHERE id_product = $1 AND id_user = $2', [id_product, id_user])
    
    if (existing.rows.length > 0) {
        const result = await pool.query('UPDATE product_evaluations SET assessment = $1, comment = $2 WHERE id_product = $3 AND id_user = $4 RETURNING *', [assessment, comment, id_product, id_user])
        return result.rows[0]
    } else {
        const result = await pool.query('INSERT INTO product_evaluations (id_product, id_user, assessment, comment) VALUES ($1, $2, $3, $4) RETURNING *',[id_product, id_user, assessment, comment])
        return result.rows[0]
    }
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
