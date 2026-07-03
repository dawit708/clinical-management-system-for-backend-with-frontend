const db = require('../config/db')

// Find user by email
const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    return rows[0]
}

// Create new user (register)
const createUser = async (full_name, email, password_hash, role) => {
    const [result] = await db.query(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [full_name, email, password_hash, role]
    )
    return result.insertId
}

// Find user by ID
const findUserById = async (id) => {
    const [rows] = await db.query(
        'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
        [id]
    )
    return rows[0]
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
}