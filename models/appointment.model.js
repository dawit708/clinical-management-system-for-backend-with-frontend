const db = require('../config/db')

// Get all appointments
const getAllAppointments = async () => {
    const [rows] = await db.query(`
        SELECT 
            a.*,
            u1.full_name AS patient_name,
            u2.full_name AS doctor_name,
            d.specialty,
            dep.name AS department_name
        FROM appointments a
        JOIN patients p   ON a.patient_id   = p.id
        JOIN users u1     ON p.user_id      = u1.id
        JOIN doctors d    ON a.doctor_id    = d.id
        JOIN users u2     ON d.user_id      = u2.id
        LEFT JOIN departments dep ON d.department_id = dep.id
        ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `)
    return rows
}

// Get single appointment by ID
const getAppointmentById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            a.*,
            u1.full_name AS patient_name,
            u2.full_name AS doctor_name,
            d.specialty,
            dep.name AS department_name
        FROM appointments a
        JOIN patients p   ON a.patient_id   = p.id
        JOIN users u1     ON p.user_id      = u1.id
        JOIN doctors d    ON a.doctor_id    = d.id
        JOIN users u2     ON d.user_id      = u2.id
        LEFT JOIN departments dep ON d.department_id = dep.id
        WHERE a.id = ?
    `, [id])
    return rows[0]
}

// Get appointments by patient ID
const getAppointmentsByPatientId = async (patient_id) => {
    const [rows] = await db.query(`
        SELECT 
            a.*,
            u2.full_name AS doctor_name,
            d.specialty,
            dep.name AS department_name
        FROM appointments a
        JOIN doctors d    ON a.doctor_id    = d.id
        JOIN users u2     ON d.user_id      = u2.id
        LEFT JOIN departments dep ON d.department_id = dep.id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date DESC
    `, [patient_id])
    return rows
}

// Get appointments by doctor ID
const getAppointmentsByDoctorId = async (doctor_id) => {
    const [rows] = await db.query(`
        SELECT 
            a.*,
            u1.full_name AS patient_name,
            p.phone      AS patient_phone,
            p.gender     AS patient_gender
        FROM appointments a
        JOIN patients p  ON a.patient_id = p.id
        JOIN users u1    ON p.user_id    = u1.id
        WHERE a.doctor_id = ?
        ORDER BY a.appointment_date DESC
    `, [doctor_id])
    return rows
}

// Create new appointment
const createAppointment = async (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_time,
    notes
) => {
    const [result] = await db.query(`
        INSERT INTO appointments 
        (patient_id, doctor_id, appointment_date, appointment_time, notes)
        VALUES (?, ?, ?, ?, ?)
    `, [patient_id, doctor_id, appointment_date, appointment_time, notes])
    return result.insertId
}

// Update appointment status
const updateAppointmentStatus = async (id, status) => {
    const [result] = await db.query(
        'UPDATE appointments SET status = ? WHERE id = ?',
        [status, id]
    )
    return result.affectedRows
}

// Update appointment
const updateAppointment = async (
    id,
    appointment_date,
    appointment_time,
    notes,
    status
) => {
    const [result] = await db.query(`
        UPDATE appointments 
        SET appointment_date = ?, appointment_time = ?, notes = ?, status = ?
        WHERE id = ?
    `, [appointment_date, appointment_time, notes, status, id])
    return result.affectedRows
}

// Delete appointment
const deleteAppointment = async (id) => {
    const [result] = await db.query(
        'DELETE FROM appointments WHERE id = ?',
        [id]
    )
    return result.affectedRows
}

// Check if slot is already booked
const checkSlotAvailability = async (
    doctor_id,
    appointment_date,
    appointment_time
) => {
    const [rows] = await db.query(`
        SELECT * FROM appointments
        WHERE doctor_id = ?
        AND appointment_date = ?
        AND appointment_time = ?
        AND status != 'cancelled'
    `, [doctor_id, appointment_date, appointment_time])
    return rows[0]
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    createAppointment,
    updateAppointmentStatus,
    updateAppointment,
    deleteAppointment,
    checkSlotAvailability
}