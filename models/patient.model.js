const db = require('../config/db')

// Get all patients
const getAllPatients = async () => {
    const [rows] = await db.query(`
        SELECT p.*, u.full_name, u.email, u.created_at
        FROM patients p
        JOIN users u ON p.user_id = u.id
    `)
    return rows
}

// Get single patient by ID
const getPatientById = async (id) => {
    const [rows] = await db.query(`
        SELECT p.*, u.full_name, u.email, u.created_at
        FROM patients p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = ?
    `, [id])
    return rows[0]
}

// Get patient by user ID
const getPatientByUserId = async (user_id) => {
    const [rows] = await db.query(
        'SELECT * FROM patients WHERE user_id = ?',
        [user_id]
    )
    return rows[0]
}

// Create new patient
const createPatient = async (user_id, date_of_birth, phone, gender, address) => {
    const [result] = await db.query(
        'INSERT INTO patients (user_id, date_of_birth, phone, gender, address) VALUES (?, ?, ?, ?, ?)',
        [user_id, date_of_birth, phone, gender, address]
    )
    return result.insertId
}

// Update patient
const updatePatient = async (id, date_of_birth, phone, gender, address) => {
    const [result] = await db.query(
        'UPDATE patients SET date_of_birth = ?, phone = ?, gender = ?, address = ? WHERE id = ?',
        [date_of_birth, phone, gender, address, id]
    )
    return result.affectedRows
}

// Delete patient
const deletePatient = async (id) => {
    const [result] = await db.query(
        'DELETE FROM patients WHERE id = ?',
        [id]
    )
    return result.affectedRows
}

module.exports = {
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    createPatient,
    updatePatient,
    deletePatient
}