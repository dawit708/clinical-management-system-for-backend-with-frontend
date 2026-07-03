const express = require('express')
const cors = require('cors')
require('dotenv').config()
const pool = require('./config/db')

// ── Import Routes ───────────────────────────────────────────
const authRoutes       = require('./routes/auth.routes')
const departmentRoutes = require('./routes/department.routes')
const doctorRoutes     = require('./routes/doctor.routes')
const patientRoutes = require('./routes/patient.routes')
const appointmentRoutes = require('./routes/appointment.routes')
const scheduleRoutes    = require('./routes/schedule.routes')
const app = express()
app.use(cors())
app.use(express.json())

// ── Test DB connection on startup ──────────────────────────
const testDbConnection = async () => {
  try {
    const connection = await pool.getConnection()
    console.log('✅ Database connected successfully!')
    connection.release()
  } catch (err) {
    console.error('❌ Database connection failed:', err.message)
  }
}

testDbConnection()

// ── API Routes ──────────────────────────────────────────────
app.use('/api/auth',        authRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/doctors',     doctorRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/schedules',    scheduleRoutes)
// ── Base Route ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Clinic API running ✅' })
})

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found ❌' })
})

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))