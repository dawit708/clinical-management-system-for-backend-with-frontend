const express = require('express')
const router = express.Router()
const {
    getSchedules,
    getMySchedule,
    getDoctorSchedule,
    addSchedule,
    editSchedule,
    removeSchedule
} = require('../controllers/schedule.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

// ── Public Routes ───────────────────────────────────────────
router.get('/doctor/:doctor_id', getDoctorSchedule)

// ── Doctor Routes ───────────────────────────────────────────
router.get('/my-schedule', authMiddleware, roleMiddleware('doctor'), getMySchedule)
router.post('/',           authMiddleware, roleMiddleware('doctor'), addSchedule)
router.put('/:id',         authMiddleware, roleMiddleware('doctor'), editSchedule)
router.delete('/:id',      authMiddleware, roleMiddleware('doctor', 'admin'), removeSchedule)

// ── Admin Routes ────────────────────────────────────────────
router.get('/', authMiddleware, roleMiddleware('admin'), getSchedules)

module.exports = router