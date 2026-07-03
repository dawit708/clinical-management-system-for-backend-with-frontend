const db = require('../config/db')

// Get all schedules
const getAllSchedules = async () => {
    const [rows] = await db.query(`
        SELECT 
            s.*,
            u.full_name AS doctor_name,
            d.specialty,
            dep.name AS department_name
        FROM schedules s
        JOIN doctors d    ON s.doctor_id    = d.id
        JOIN users u      ON d.user_id      = u.id
        LEFT JOIN departments dep ON d.department_id = dep.id
        ORDER BY s.doctor_id, s.day_of_week
    `)
    return rows
}

// Get schedule by doctor ID
const getScheduleByDoctorId = async (doctor_id) => {
    const [rows] = await db.query(`
        SELECT 
            s.*,
            u.full_name AS doctor_name,
            d.specialty
        FROM schedules s
        JOIN doctors d ON s.doctor_id = d.id
        JOIN users u   ON d.user_id   = u.id
        WHERE s.doctor_id = ?
        ORDER BY s.day_of_week
    `, [doctor_id])
    return rows
}

// Get single schedule by ID
const getScheduleById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM schedules WHERE id = ?',
        [id]
    )
    return rows[0]
}

// Create schedule
const createSchedule = async (
    doctor_id,
    day_of_week,
    start_time,
    end_time
) => {
    const [result] = await db.query(`
        INSERT INTO schedules 
        (doctor_id, day_of_week, start_time, end_time)
        VALUES (?, ?, ?, ?)
    `, [doctor_id, day_of_week, start_time, end_time])
    return result.insertId
}

// Update schedule
const updateSchedule = async (id, day_of_week, start_time, end_time) => {
    const [result] = await db.query(`
        UPDATE schedules 
        SET day_of_week = ?, start_time = ?, end_time = ?
        WHERE id = ?
    `, [day_of_week, start_time, end_time, id])
    return result.affectedRows
}

// Delete schedule
const deleteSchedule = async (id) => {
    const [result] = await db.query(
        'DELETE FROM schedules WHERE id = ?',
        [id]
    )
    return result.affectedRows
}

// Check if schedule already exists for that day
const checkScheduleExists = async (doctor_id, day_of_week) => {
    const [rows] = await db.query(`
        SELECT * FROM schedules 
        WHERE doctor_id = ? AND day_of_week = ?
    `, [doctor_id, day_of_week])
    return rows[0]
}

module.exports = {
    getAllSchedules,
    getScheduleByDoctorId,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    checkScheduleExists
}