const express = require('express')
const cors = require('cors')
require('dotenv').config()
const pool = require('./config/db')

const app = express()
app.use(cors())
app.use(express.json())

// ── Test DB connection on startup ──────────────────────────
const testDbConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (err) {
    console.error(' Database connection failed:', err.message);
  }
};

testDbConnection();

// ── Routes ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Clinic API running ✅' })
})

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))