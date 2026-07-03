const db = require('../config/db')

// Get all departments
const getAllDepartments = async () => {
    const [rows] = await db.query(
        'SELECT * FROM departments'
    )
    return rows
}

// Get single department by ID
const getDepartmentById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM departments WHERE id = ?',
        [id]
    )
    return rows[0]
}

// Create new department
const createDepartment = async (name, description) => {
    const [result] = await db.query(
        'INSERT INTO departments (name, description) VALUES (?, ?)',
        [name, description]
    )
    return result.insertId
}

// Update department
const updateDepartment = async (id, name, description) => {
    const [result] = await db.query(
        'UPDATE departments SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
    )
    return result.affectedRows
}

// Delete department
const deleteDepartment = async (id) => {
    const [result] = await db.query(
        'DELETE FROM departments WHERE id = ?',
        [id]
    )
    return result.affectedRows
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
}