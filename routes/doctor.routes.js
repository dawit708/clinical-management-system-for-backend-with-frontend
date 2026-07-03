const express = require('express')
const router = express.Router()
const {
    getDoctors,
    getDoctor,
    addDoctor,
    editDoctor,
    removeDoctor
} = require('../controllers/doctor.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

// ── Public Routes ───────────────────────────────────────────
router.get('/',     getDoctors)
router.get('/:id',  getDoctor)

// ── Admin Only Routes ───────────────────────────────────────
router.post('/',      authMiddleware, roleMiddleware('admin'), addDoctor)
router.put('/:id',    authMiddleware, roleMiddleware('admin', 'doctor'), editDoctor)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removeDoctor)

module.exports = router