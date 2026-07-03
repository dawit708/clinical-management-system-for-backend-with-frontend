const {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    createAppointment,
    updateAppointmentStatus,
    updateAppointment,
    deleteAppointment,
    checkSlotAvailability
} = require('../models/appointment.model')
const { getPatientByUserId } = require('../models/patient.model')
const { getDoctorByUserId }  = require('../models/doctor.model')

// ── Get All Appointments (Admin) ────────────────────────────
const getAppointments = async (req, res) => {
    try {
        const appointments = await getAllAppointments()
        res.status(200).json({
            message: 'Appointments fetched successfully ✅',
            data: appointments
        })
    } catch (error) {
        console.error('Get appointments error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get Single Appointment ──────────────────────────────────
const getAppointment = async (req, res) => {
    try {
        const appointment = await getAppointmentById(req.params.id)
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found ❌' })
        }
        res.status(200).json({
            message: 'Appointment fetched successfully ✅',
            data: appointment
        })
    } catch (error) {
        console.error('Get appointment error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get My Appointments (Patient) ───────────────────────────
const getMyAppointmentsPatient = async (req, res) => {
    try {
        const patient = await getPatientByUserId(req.user.id)
        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found ❌' })
        }
        const appointments = await getAppointmentsByPatientId(patient.id)
        res.status(200).json({
            message: 'My appointments fetched successfully ✅',
            data: appointments
        })
    } catch (error) {
        console.error('Get my appointments error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Get My Appointments (Doctor) ────────────────────────────
const getMyAppointmentsDoctor = async (req, res) => {
    try {
        const doctor = await getDoctorByUserId(req.user.id)
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found ❌' })
        }
        const appointments = await getAppointmentsByDoctorId(doctor.id)
        res.status(200).json({
            message: 'My appointments fetched successfully ✅',
            data: appointments
        })
    } catch (error) {
        console.error('Get doctor appointments error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Book Appointment (Patient) ──────────────────────────────
const bookAppointment = async (req, res) => {
    try {
        const {
            doctor_id,
            appointment_date,
            appointment_time,
            notes
        } = req.body

        // 1. Check required fields
        if (!doctor_id || !appointment_date || !appointment_time) {
            return res.status(400).json({ message: 'Doctor, date and time are required' })
        }

        // 2. Get patient profile
        const patient = await getPatientByUserId(req.user.id)
        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found ❌' })
        }

        // 3. Check slot availability
        const slotTaken = await checkSlotAvailability(
            doctor_id,
            appointment_date,
            appointment_time
        )
        if (slotTaken) {
            return res.status(400).json({ message: 'This time slot is already booked ❌' })
        }

        // 4. Create appointment
        const appointmentId = await createAppointment(
            patient.id,
            doctor_id,
            appointment_date,
            appointment_time,
            notes
        )

        res.status(201).json({
            message: 'Appointment booked successfully ✅',
            appointmentId
        })
    } catch (error) {
        console.error('Book appointment error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Update Appointment Status (Doctor) ──────────────────────
const changeAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body

        // Check valid status
        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value ❌' })
        }

        const affected = await updateAppointmentStatus(req.params.id, status)
        if (affected === 0) {
            return res.status(404).json({ message: 'Appointment not found ❌' })
        }

        res.status(200).json({ message: `Appointment ${status} successfully ✅` })
    } catch (error) {
        console.error('Update status error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Update Appointment (Admin) ──────────────────────────────
const editAppointment = async (req, res) => {
    try {
        const {
            appointment_date,
            appointment_time,
            notes,
            status
        } = req.body

        if (!appointment_date || !appointment_time) {
            return res.status(400).json({ message: 'Date and time are required' })
        }

        const affected = await updateAppointment(
            req.params.id,
            appointment_date,
            appointment_time,
            notes,
            status
        )

        if (affected === 0) {
            return res.status(404).json({ message: 'Appointment not found ❌' })
        }

        res.status(200).json({ message: 'Appointment updated successfully ✅' })
    } catch (error) {
        console.error('Update appointment error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ── Delete Appointment (Admin) ──────────────────────────────
const removeAppointment = async (req, res) => {
    try {
        const affected = await deleteAppointment(req.params.id)
        if (affected === 0) {
            return res.status(404).json({ message: 'Appointment not found ❌' })
        }
        res.status(200).json({ message: 'Appointment deleted successfully ✅' })
    } catch (error) {
        console.error('Delete appointment error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getAppointments,
    getAppointment,
    getMyAppointmentsPatient,
    getMyAppointmentsDoctor,
    bookAppointment,
    changeAppointmentStatus,
    editAppointment,
    removeAppointment
}