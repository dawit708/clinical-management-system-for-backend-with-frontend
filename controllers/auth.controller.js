const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findUserByEmail, createUser, findUserById } = require('../models/auth.model')

// ── REGISTER ────────────────────────────────────────────────
const register = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body

        // 1. Check all fields are filled
        if (!full_name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // 2. Check if email already exists
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(password, salt)

        // 4. Save user to database
        const userId = await createUser(full_name, email, password_hash, role)

        // 5. Return success
        res.status(201).json({
            message: 'User registered successfully ✅',
            userId
        })

    } catch (error) {
        console.error('Register error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── LOGIN ───────────────────────────────────────────────────
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // 1. Check all fields are filled
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // 2. Check if user exists
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // 3. Check password is correct
        const isMatch = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // 4. Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // 5. Return token and user info
        res.status(200).json({
            message: 'Login successful ✅',
            token,
            user: {
                id:        user.id,
                full_name: user.full_name,
                email:     user.email,
                role:      user.role
            }
        })

    } catch (error) {
        console.error('Login error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── GET CURRENT USER ────────────────────────────────────────
const getMe = async (req, res) => {
    try {
        const user = await findUserById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ user })
    } catch (error) {
        console.error('GetMe error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { register, login, getMe }