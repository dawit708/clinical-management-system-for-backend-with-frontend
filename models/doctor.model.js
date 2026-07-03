const db = require('../config/db')

// Get all doctors
const getAllDoctors = async () => {
    const [rows] = await db.query(`
        SELECT d.*, u.full_name, u.email, dep.name AS department_name
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        LEFT JOIN departments dep ON d.department_id = dep.id
    `)
    return rows
}

// Get single doctor by ID
const getDoctorById = async (id) => {
    const [rows] = await db.query(`
        SELECT d.*, u.full_name, u.email, dep.name AS department_name
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        LEFT JOIN departments dep ON d.department_id = dep.id
        WHERE d.id = ?
    `, [id])
    return rows[0]
}

// Get doctor by user ID
const getDoctorByUserId = async (user_id) => {
    const [rows] = await db.query(
        'SELECT * FROM doctors WHERE user_id = ?',
        [user_id]
    )
    return rows[0]
}

// Create new doctor
const createDoctor = async (user_id, specialty, department_id, bio) => {
    const [result] = await db.query(
        'INSERT INTO doctors (user_id, specialty, department_id, bio) VALUES (?, ?, ?, ?)',
        [user_id, specialty, department_id, bio]
    )
    return result.insertId
}

// Update doctor
const updateDoctor = async (id, specialty, department_id, bio, available) => {
    const [result] = await db.query(
        'UPDATE doctors SET specialty = ?, department_id = ?, bio = ?, available = ? WHERE id = ?',
        [specialty, department_id, bio, available, id]
    )
    return result.affectedRows
}

// Delete doctor
const deleteDoctor = async (id) => {
    const [result] = await db.query(
        'DELETE FROM doctors WHERE id = ?',
        [id]
    )
    return result.affectedRows
}

module.exports = {
    getAllDoctors,
    getDoctorById,
    getDoctorByUserId,
    createDoctor,
    updateDoctor,
    deleteDoctor
}