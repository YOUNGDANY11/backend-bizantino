const pool = require('../config/db')

const getAll = async() =>{
    const result = await pool.query('SELECT * FROM users')
    return result.rows
}

const getById = async(id_user) =>{
    const result = await pool.query('SELECT * FROM users WHERE id_user = $1',[id_user])
    return result.rows[0]
}

const getByEmail = async(email) =>{
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email])
    return result.rows[0]
}

const getEmails = async(email) =>{
    const result = await pool.query('SELECT * FROM users WHERE email ILIKE $1',[`%${email}%`])
    return result.rows
}

const getByDocumentId = async(document_number) =>{
    const result = await pool.query('SELECT * FROM users WHERE document_number = $1',[document_number])
    return result.rows[0]
}

const create = async(name,lastname,email, address, city, hashedPassword, document_type, document_number, phone_number, role) =>{
    const result = await pool.query('INSERT INTO users (name,lastname,email, address, city, password, document_type, document_number, phone_number, role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',[name,lastname,email, address, city, hashedPassword, document_type, document_number, phone_number, role])
    return result.rows[0]
}

const update_address = async(address,id_user) =>{
    const result = await pool.query('UPDATE users SET address = $1 WHERE id_user = $2 RETURNING *',[address,id_user])
    return result.rows[0]
}

const deleteUser = async(id_user) =>{
    const result = await pool.query('DELETE FROM users WHERE id_user = $1 RETURNING *',[id_user])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByEmail,
    getEmails,
    getByDocumentId,
    create,
    update_address,
    deleteUser
}