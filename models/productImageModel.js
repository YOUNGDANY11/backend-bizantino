const pool = require('../config/db')

const create = async(id_product, image_url) =>{
    const result =  await pool.query('INSERT INTO product_images (id_product, image_url) VALUES ($1, $2) RETURNING *',[id_product, image_url])
    return result.rows[0]
}

const getByProductId = async(id_product) =>{
    const result = await pool.query('SELECT * FROM product_images WHERE id_product = $1',[id_product])
    return result.rows
}

const deleteImage = async(id_image) =>{
    const existing = await pool.query('SELECT * FROM product_images WHERE id_image = $1',[id_image])
    if(existing.rows.length === 0){
        return null
    }
    await pool.query('DELETE FROM product_images WHERE id_image = $1',[id_image])
    return existing.rows[0]
}

module.exports = {
    create,
    getByProductId,
    deleteImage
}