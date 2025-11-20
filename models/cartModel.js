const pool = require('../config/db')

const getById = async(id_cart_item) =>{
    const result = await pool.query('SELECT * FROM cart_items WHERE id_cart_item = $1',[id_cart_item])
    return result.rows[0]
}
const getCartItems = async(id_user) => {
    const result = await pool.query('SELECT * FROM cart_items WHERE id_user = $1',[id_user])
    return result.rows
}

const addToCart = async(id_user, id_product, quantity) => {
    const result = await pool.query('INSERT INTO cart_items (id_user, id_product, quantity) VALUES ($1, $2, $3) RETURNING *',[id_user, id_product, quantity])
    return result.rows[0]
}

const getProductInCart = async(id_user, id_product) => {
    const result = await pool.query('SELECT * FROM cart_items WHERE id_user = $1 AND id_product = $2',[id_user, id_product])
    return result.rows[0]
}

const updateCartItem = async(id_cart_item, quantity) => {
    const result = await pool.query('UPDATE cart_items SET quantity = $1 WHERE id_cart_item = $2 RETURNING *',[quantity, id_cart_item])
    return result.rows[0]
}

const deleteCartItem = async(id_cart_item) => {
    const result = await pool.query('DELETE FROM cart_items WHERE id_cart_item = $1 RETURNING *',[id_cart_item])
    return result.rows[0]
}

module.exports = {
    getById,
    getCartItems,
    getProductInCart,
    addToCart,
    updateCartItem,
    deleteCartItem
}