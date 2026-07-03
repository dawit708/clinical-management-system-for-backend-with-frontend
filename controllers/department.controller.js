const {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require('../models/department.model')

// ── Get All Departments ─────────────────────────────────────
const getDepartments = async (req, res) => {
    try {
        const departments = await getAllDepartments()
        res.status(200).json({
            message: 'Departments fetched successfully ✅',
            data: departments
        })
    } catch (error) {
        console.error('Get departments error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get Single Department ───────────────────────────────────
const getDepartment = async (req, res) => {
    try {
        const department = await getDepartmentById(req.params.id)
        if (!department) {
            return res.status(404).json({ message: 'Department not found ❌' })
        }
        res.status(200).json({
            message: 'Department fetched successfully ✅',
            data: department
        })
    } catch (error) {
        console.error('Get department error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Create Department ───────────────────────────────────────
const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body

        // Check required fields
        if (!name) {
            return res.status(400).json({ message: 'Department name is required' })
        }

        const departmentId = await createDepartment(name, description)
        res.status(201).json({
            message: 'Department created successfully ✅',
            departmentId
        })
    } catch (error) {
        console.error('Create department error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Update Department ───────────────────────────────────────
const editDepartment = async (req, res) => {
    try {
        const { name, description } = req.body

        // Check required fields
        if (!name) {
            return res.status(400).json({ message: 'Department name is required' })
        }

        const affected = await updateDepartment(req.params.id, name, description)
        if (affected === 0) {
            return res.status(404).json({ message: 'Department not found ❌' })
        }

        res.status(200).json({ message: 'Department updated successfully ✅' })
    } catch (error) {
        console.error('Update department error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Delete Department ───────────────────────────────────────
const removeDepartment = async (req, res) => {
    try {
        const affected = await deleteDepartment(req.params.id)
        if (affected === 0) {
            return res.status(404).json({ message: 'Department not found ❌' })
        }
        res.status(200).json({ message: 'Department deleted successfully ✅' })
    } catch (error) {
        console.error('Delete department error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getDepartments,
    getDepartment,
    addDepartment,
    editDepartment,
    removeDepartment
}