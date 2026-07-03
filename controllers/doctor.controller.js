const bcrypt = require('bcryptjs')
const {
    getAllDoctors,
    getDoctorById,
    getDoctorByUserId,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../models/doctor.model')
const { createUser, findUserByEmail } = require('../models/auth.model')

// ── Get All Doctors ─────────────────────────────────────────
const getDoctors = async (req, res) => {
    try {
        const doctors = await getAllDoctors()
        res.status(200).json({
            message: 'Doctors fetched successfully ✅',
            data: doctors
        })
    } catch (error) {
        console.error('Get doctors error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get Single Doctor ───────────────────────────────────────
const getDoctor = async (req, res) => {
    try {
        const doctor = await getDoctorById(req.params.id)
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found ❌' })
        }
        res.status(200).json({
            message: 'Doctor fetched successfully ✅',
            data: doctor
        })
    } catch (error) {
        console.error('Get doctor error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Create Doctor ───────────────────────────────────────────
const addDoctor = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            specialty,
            department_id,
            bio
        } = req.body

        // 1. Check required fields
        if (!full_name || !email || !password || !specialty) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // 2. Check if email already exists
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists ❌' })
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(password, salt)

        // 4. Create user with doctor role
        const userId = await createUser(full_name, email, password_hash, 'doctor')

        // 5. Create doctor record
        const doctorId = await createDoctor(userId, specialty, department_id, bio)

        res.status(201).json({
            message: 'Doctor created successfully ✅',
            doctorId
        })
    } catch (error) {
        console.error('Create doctor error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Update Doctor ───────────────────────────────────────────
const editDoctor = async (req, res) => {
    try {
        const { specialty, department_id, bio, available } = req.body

        // Check required fields
        if (!specialty) {
            return res.status(400).json({ message: 'Specialty is required' })
        }

        const affected = await updateDoctor(
            req.params.id,
            specialty,
            department_id,
            bio,
            available
        )

        if (affected === 0) {
            return res.status(404).json({ message: 'Doctor not found ❌' })
        }

        res.status(200).json({ message: 'Doctor updated successfully ✅' })
    } catch (error) {
        console.error('Update doctor error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Delete Doctor ───────────────────────────────────────────
const removeDoctor = async (req, res) => {
    try {
        const affected = await deleteDoctor(req.params.id)
        if (affected === 0) {
            return res.status(404).json({ message: 'Doctor not found ❌' })
        }
        res.status(200).json({ message: 'Doctor deleted successfully ✅' })
    } catch (error) {
        console.error('Delete doctor error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getDoctors,
    getDoctor,
    addDoctor,
    editDoctor,
    removeDoctor
}