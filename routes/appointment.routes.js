const express = require('express')
const router = express.Router()
const {
    getAppointments,
    getAppointment,
    getMyAppointmentsPatient,
    getMyAppointmentsDoctor,
    bookAppointment,
    changeAppointmentStatus,
    editAppointment,
    removeAppointment
} = require('../controllers/appointment.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

// ── Patient Routes ──────────────────────────────────────────
router.get('/my-appointments', authMiddleware, roleMiddleware('patient'), getMyAppointmentsPatient)
router.post('/book',           authMiddleware, roleMiddleware('patient'), bookAppointment)

// ── Doctor Routes ───────────────────────────────────────────
router.get('/doctor-appointments', authMiddleware, roleMiddleware('doctor'), getMyAppointmentsDoctor)
router.patch('/:id/status',        authMiddleware, roleMiddleware('doctor', 'admin'), changeAppointmentStatus)

// ── Admin Routes ────────────────────────────────────────────
router.get('/',       authMiddleware, roleMiddleware('admin'), getAppointments)
router.get('/:id',    authMiddleware, roleMiddleware('admin', 'doctor'), getAppointment)
router.put('/:id',    authMiddleware, roleMiddleware('admin'), editAppointment)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removeAppointment)

module.exports = router