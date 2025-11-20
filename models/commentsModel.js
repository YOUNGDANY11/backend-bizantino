const pool = require('../config/db')

const getAll = async()=>{
    const query = `
        SELECT 
            c.*,
            u.name AS user_name,
            u.lastname AS user_lastname,
            u.email AS user_email,
            p.name AS product_name,
            p.description AS product_description,
            p.tipe AS product_tipe,
            p.size AS product_size
        FROM comments c
        LEFT JOIN users u ON c.id_user = u.id_user
        LEFT JOIN products p ON c.id_product = p.id_product
        ORDER BY c.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
}

const getById = async(id_comment)=>{
    const result = await pool.query('SELECT * FROM comments WHERE id_comment = $1',[id_comment])
    return result.rows[0]
}

const getByUserId = async(id_user)=>{
    const query = `
        SELECT c.*, p.id_product, p.name AS product_name, p.description AS product_description, p.size, p.tipe
        FROM comments c
        JOIN products p ON c.id_product = p.id_product
        WHERE c.id_user = $1
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
}

const create = async(id_product,id_user,comment) =>{
    const result = await pool.query('INSERT INTO comments (id_product, id_user, comment) VALUES ($1, $2, $3) RETURNING *',[id_product, id_user, comment])
    return result.rows[0]
}

const deleteComment = async(id_comment) =>{
    const result = await pool.query('DELETE FROM comments WHERE id_comment =$1 RETURNING *',[id_comment])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    deleteComment
}