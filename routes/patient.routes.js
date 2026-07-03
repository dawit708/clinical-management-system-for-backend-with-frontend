const express = require('express')
const router = express.Router()
const {
    getPatients,
    getPatient,
    addPatient,
    editPatient,
    removePatient,
    getMyProfile
} = require('../controllers/patient.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

// ── Patient Own Profile ─────────────────────────────────────
router.get('/me', authMiddleware, roleMiddleware('patient'), getMyProfile)

// ── Admin Only Routes ───────────────────────────────────────
router.get('/',       authMiddleware, roleMiddleware('admin'), getPatients)
router.get('/:id',    authMiddleware, roleMiddleware('admin', 'doctor'), getPatient)
router.post('/',      authMiddleware, roleMiddleware('admin'), addPatient)
router.put('/:id',    authMiddleware, roleMiddleware('admin', 'patient'), editPatient)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removePatient)

module.exports = router