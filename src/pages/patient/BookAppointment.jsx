import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { doctorService, scheduleService, appointmentService } from '../../services/api'
import './BookAppointment.css'

const BookAppointment = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const preSelectedDoctor = searchParams.get('doctor')

    const [doctors,   setDoctors]   = useState([])
    const [schedules, setSchedules] = useState([])
    const [loading,   setLoading]   = useState(true)
    const [error,     setError]     = useState('')
    const [success,   setSuccess]   = useState('')
    const [submitting, setSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        doctor_id:        preSelectedDoctor || '',
        appointment_date: '',
        appointment_time: '',
        notes:            ''
    })

    useEffect(() => { fetchDoctors() }, [])

    useEffect(() => {
        if (formData.doctor_id) {
            fetchDoctorSchedule(formData.doctor_id)
        }
    }, [formData.doctor_id])

    const fetchDoctors = async () => {
        try {
            const res = await doctorService.getAll()
            setDoctors(res.data.data.filter(d => d.available))
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchDoctorSchedule = async (doctorId) => {
        try {
            const res = await scheduleService.getByDoctor(doctorId)
            setSchedules(res.data.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Get available days for selected doctor
    const getAvailableDays = () => {
        return schedules.map(s => s.day_of_week)
    }

    // Check if selected date is a working day
    const isDateAvailable = (dateStr) => {
        if (!dateStr) return true
        const dayName = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' })
        return getAvailableDays().includes(dayName)
    }

    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctor_id))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.doctor_id || !formData.appointment_date || !formData.appointment_time) {
            return setError('Please fill all required fields ❌')
        }

        if (!isDateAvailable(formData.appointment_date)) {
            return setError('Doctor is not available on this day ❌')
        }

        setSubmitting(true)
        try {
            await appointmentService.book(formData)
            setSuccess('Appointment booked successfully! Redirecting... ✅')
            setTimeout(() => navigate('/patient/appointments'), 2000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0]

    if (loading) {
        return (
            <DashboardLayout title="Book Appointment" role="patient">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading doctors...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Book Appointment" role="patient">
            <div className="book-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">📅 Book an Appointment</h2>
                        <p className="page-subtitle">
                            Choose a doctor, date and time that works for you
                        </p>
                    </div>
                </div>

                <div className="book-layout">

                    {/* Form */}
                    <div className="book-form-card">
                        {success && <div className="alert success">{success}</div>}
                        {error   && <div className="alert error">{error}</div>}

                        <form onSubmit={handleSubmit} className="book-form">

                            <div className="form-group">
                                <label>👨‍⚕️ Select Doctor</label>
                                <select
                                    name="doctor_id"
                                    value={formData.doctor_id}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Choose a doctor</option>
                                    {doctors.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.full_name} — {d.specialty}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {formData.doctor_id && schedules.length > 0 && (
                                <div className="available-days-box">
                                    <p className="available-days-title">
                                        📆 Available Days:
                                    </p>
                                    <div className="available-days-chips">
                                        {schedules.map((s) => (
                                            <span key={s.id} className="day-chip">
                                                {s.day_of_week} ({s.start_time}–{s.end_time})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="form-row">
                                <div className="form-group">
                                    <label>📅 Date</label>
                                    <input
                                        type="date"
                                        name="appointment_date"
                                        value={formData.appointment_date}
                                        onChange={handleChange}
                                        min={today}
                                        required
                                        className="form-input"
                                    />
                                    {formData.appointment_date &&
                                     !isDateAvailable(formData.appointment_date) && (
                                        <p className="field-warning">
                                            ⚠️ Doctor not available this day
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>🕐 Time</label>
                                    <input
                                        type="time"
                                        name="appointment_time"
                                        value={formData.appointment_time}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>📝 Reason for Visit (optional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Describe your symptoms or reason for visit..."
                                    className="form-input"
                                    rows="4"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-book-submit"
                            >
                                {submitting ? '⏳ Booking...' : '✅ Confirm Booking'}
                            </button>

                        </form>
                    </div>

                    {/* Doctor Preview Card */}
                    <div className="doctor-preview-card">
                        {selectedDoctor ? (
                            <>
                                <div className="preview-avatar">
                                    {selectedDoctor.full_name?.charAt(0)}
                                </div>
                                <h3>{selectedDoctor.full_name}</h3>
                                <p className="preview-specialty">
                                    🩺 {selectedDoctor.specialty}
                                </p>
                                <p className="preview-dept">
                                    🏥 {selectedDoctor.department_name || 'General'}
                                </p>
                                {selectedDoctor.bio && (
                                    <p className="preview-bio">{selectedDoctor.bio}</p>
                                )}
                                <div className="preview-badge">✅ Available</div>
                            </>
                        ) : (
                            <div className="preview-empty">
                                <div className="preview-empty-icon">👨‍⚕️</div>
                                <p>Select a doctor to see details</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default BookAppointment