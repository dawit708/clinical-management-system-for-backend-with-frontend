const express = require('express')
const router = express.Router()
const { register, login, getMe } = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

// ── Public Routes ───────────────────────────────────────────
router.post('/register', register)
router.post('/login',    login)

// ── Protected Route (need token) ───────────────────────────
router.get('/me', authMiddleware, getMe)

module.exports = router