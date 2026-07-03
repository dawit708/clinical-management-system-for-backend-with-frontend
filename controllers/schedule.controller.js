const {
    getAllSchedules,
    getScheduleByDoctorId,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    checkScheduleExists
} = require('../models/schedule.model')
const { getDoctorByUserId } = require('../models/doctor.model')

// ── Get All Schedules (Admin) ───────────────────────────────
const getSchedules = async (req, res) => {
    try {
        const schedules = await getAllSchedules()
        res.status(200).json({
            message: 'Schedules fetched successfully ✅',
            data: schedules
        })
    } catch (error) {
        console.error('Get schedules error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get My Schedule (Doctor) ────────────────────────────────
const getMySchedule = async (req, res) => {
    try {
        const doctor = await getDoctorByUserId(req.user.id)
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found ❌' })
        }
        const schedules = await getScheduleByDoctorId(doctor.id)
        res.status(200).json({
            message: 'My schedule fetched successfully ✅',
            data: schedules
        })
    } catch (error) {
        console.error('Get my schedule error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get Doctor Schedule by ID (Public) ─────────────────────
const getDoctorSchedule = async (req, res) => {
    try {
        const schedules = await getScheduleByDoctorId(req.params.doctor_id)
        res.status(200).json({
            message: 'Doctor schedule fetched successfully ✅',
            data: schedules
        })
    } catch (error) {
        console.error('Get doctor schedule error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Add Schedule (Doctor) ───────────────────────────────────
const addSchedule = async (req, res) => {
    try {
        const { day_of_week, start_time, end_time } = req.body

        // 1. Check required fields
        if (!day_of_week || !start_time || !end_time) {
            return res.status(400).json({ message: 'Day, start time and end time are required' })
        }

        // 2. Get doctor profile
        const doctor = await getDoctorByUserId(req.user.id)
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found ❌' })
        }

        // 3. Check if schedule already exists for that day
        const existing = await checkScheduleExists(doctor.id, day_of_week)
        if (existing) {
            return res.status(400).json({ message: `Schedule for ${day_of_week} already exists ❌` })
        }

        // 4. Create schedule
        const scheduleId = await createSchedule(
            doctor.id,
            day_of_week,
            start_time,
            end_time
        )

        res.status(201).json({
            message: 'Schedule created successfully ✅',
            scheduleId
        })
    } catch (error) {
        console.error('Create schedule error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Update Schedule (Doctor) ────────────────────────────────
const editSchedule = async (req, res) => {
    try {
        const { day_of_week, start_time, end_time } = req.body

        // Check required fields
        if (!day_of_week || !start_time || !end_time) {
            return res.status(400).json({ message: 'Day, start time and end time are required' })
        }

        const affected = await updateSchedule(
            req.params.id,
            day_of_week,
            start_time,
            end_time
        )

        if (affected === 0) {
            return res.status(404).json({ message: 'Schedule not found ❌' })
        }

        res.status(200).json({ message: 'Schedule updated successfully ✅' })
    } catch (error) {
        console.error('Update schedule error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Delete Schedule (Doctor or Admin) ──────────────────────
const removeSchedule = async (req, res) => {
    try {
        const affected = await deleteSchedule(req.params.id)
        if (affected === 0) {
            return res.status(404).json({ message: 'Schedule not found ❌' })
        }
        res.status(200).json({ message: 'Schedule deleted successfully ✅' })
    } catch (error) {
        console.error('Delete schedule error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getSchedules,
    getMySchedule,
    getDoctorSchedule,
    addSchedule,
    editSchedule,
    removeSchedule
}