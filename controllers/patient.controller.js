const bcrypt = require('bcryptjs')
const {
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    createPatient,
    updatePatient,
    deletePatient
} = require('../models/patient.model')
const { createUser, findUserByEmail } = require('../models/auth.model')

// ── Get All Patients ────────────────────────────────────────
const getPatients = async (req, res) => {
    try {
        const patients = await getAllPatients()
        res.status(200).json({
            message: 'Patients fetched successfully ✅',
            data: patients
        })
    } catch (error) {
        console.error('Get patients error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get Single Patient ──────────────────────────────────────
const getPatient = async (req, res) => {
    try {
        const patient = await getPatientById(req.params.id)
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found ❌' })
        }
        res.status(200).json({
            message: 'Patient fetched successfully ✅',
            data: patient
        })
    } catch (error) {
        console.error('Get patient error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Create Patient ──────────────────────────────────────────
const addPatient = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            date_of_birth,
            phone,
            gender,
            address
        } = req.body

        // 1. Check required fields
        if (!full_name || !email || !password) {
            return res.status(400).json({ message: 'Full name, email and password are required' })
        }

        // 2. Check if email already exists
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists ❌' })
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(password, salt)

        // 4. Create user with patient role
        const userId = await createUser(full_name, email, password_hash, 'patient')

        // 5. Create patient record
        const patientId = await createPatient(
            userId,
            date_of_birth,
            phone,
            gender,
            address
        )

        res.status(201).json({
            message: 'Patient created successfully ✅',
            patientId
        })
    } catch (error) {
        console.error('Create patient error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Update Patient ──────────────────────────────────────────
const editPatient = async (req, res) => {
    try {
        const { date_of_birth, phone, gender, address } = req.body

        const affected = await updatePatient(
            req.params.id,
            date_of_birth,
            phone,
            gender,
            address
        )

        if (affected === 0) {
            return res.status(404).json({ message: 'Patient not found ❌' })
        }

        res.status(200).json({ message: 'Patient updated successfully ✅' })
    } catch (error) {
        console.error('Update patient error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Delete Patient ──────────────────────────────────────────
const removePatient = async (req, res) => {
    try {
        const affected = await deletePatient(req.params.id)
        if (affected === 0) {
            return res.status(404).json({ message: 'Patient not found ❌' })
        }
        res.status(200).json({ message: 'Patient deleted successfully ✅' })
    } catch (error) {
        console.error('Delete patient error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get My Profile (Patient only) ──────────────────────────
const getMyProfile = async (req, res) => {
    try {
        const patient = await getPatientByUserId(req.user.id)
        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found ❌' })
        }
        res.status(200).json({
            message: 'Profile fetched successfully ✅',
            data: patient
        })
    } catch (error) {
        console.error('Get my profile error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getPatients,
    getPatient,
    addPatient,
    editPatient,
    removePatient,
    getMyProfile
}