const pool = require('../config/db')

const getAll = async() =>{
    const result = await pool.query('SELECT * FROM products')
    return result.rows
}

const getById = async(id_product) =>{
    const query = `
        SELECT 
            p.*,
            json_agg(DISTINCT jsonb_build_object(
                'id_image', pi.id_image,
                'image_url', pi.image_url
            )) FILTER (WHERE pi.id_image IS NOT NULL) AS images,
            json_agg(DISTINCT jsonb_build_object(
                'id_product_evaluation', pe.id_product_evaluation,
                'id_user', pe.id_user,
                'user_name', u_eval.name,
                'user_lastname', u_eval.lastname,
                'assessment', pe.assessment,
                'comment', pe.comment,
                'created_at', pe.created_at
            )) FILTER (WHERE pe.id_product_evaluation IS NOT NULL) AS evaluations,
            json_agg(DISTINCT jsonb_build_object(
                'id_comment', c.id_comment,
                'id_user', c.id_user,
                'user_name', u_comment.name,
                'user_lastname', u_comment.lastname,
                'comment', c.comment,
                'created_at', c.created_at
            )) FILTER (WHERE c.id_comment IS NOT NULL) AS comments
        FROM products p
        LEFT JOIN product_images pi ON p.id_product = pi.id_product
        LEFT JOIN product_evaluations pe ON p.id_product = pe.id_product
        LEFT JOIN users u_eval ON pe.id_user = u_eval.id_user
        LEFT JOIN comments c ON p.id_product = c.id_product
        LEFT JOIN users u_comment ON c.id_user = u_comment.id_user
        WHERE p.id_product = $1
        GROUP BY p.id_product
    `
    const result = await pool.query(query, [id_product])
    return result.rows[0]
}

const getByName = async(name)=>{
    const result = await pool.query('SELECT * FROM products WHERE name ILIKE $1',[`%${name}%`])
    return result.rows
}

const getBySize = async(size) =>{
    const result = await pool.query('SELECT * FROM products WHERE size = $1',[size])
    return result.rows[0]
}

const getByTipe = async(tipe) =>{
    const result = await pool.query('SELECT * FROM products WHERE tipe = $1',[tipe])
    return result.rows[0]
}

const create = async(name,description,size,tipe,quantity,price) =>{
    const result = await pool.query('INSERT INTO products (name,description,size,tipe,quantity,price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[name,description,size,tipe,quantity,price])
    return result.rows[0]
}

const update = async(name,description,size,tipe,quantity,price,id_product) =>{
    const result = await pool.query('UPDATE products SET name = $1,description = $2,size = $3,tipe = $4,quantity = $5,price = $6 WHERE id_product = $7 RETURNING *',[name,description,size,tipe,quantity,price,id_product])
    return result.rows[0]
}

const deleteProduct = async(id_product) =>{
    const result = await pool.query('DELETE FROM products WHERE id_product =$1 RETURNING *',[id_product])
    return result.rows[0]
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