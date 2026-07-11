import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { scheduleService } from '../../services/api'
import './MySchedule.css'

const MySchedule = () => {
    const [schedules,  setSchedules]  = useState([])
    const [loading,    setLoading]    = useState(true)
    const [showModal,  setShowModal]  = useState(false)
    const [editSched,  setEditSched]  = useState(null)
    const [error,      setError]      = useState('')
    const [success,    setSuccess]    = useState('')
    const [formData,   setFormData]   = useState({
        day_of_week: '',
        start_time:  '',
        end_time:    ''
    })

    const days = [
        'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    useEffect(() => { fetchSchedules() }, [])

    const fetchSchedules = async () => {
        try {
            const res = await scheduleService.getMySchedule()
            setSchedules(res.data.data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        setEditSched(null)
        setFormData({ day_of_week: '', start_time: '', end_time: '' })
        setShowModal(true)
        setError('')
    }

    const handleEdit = (sched) => {
        setEditSched(sched)
        setFormData({
            day_of_week: sched.day_of_week,
            start_time:  sched.start_time,
            end_time:    sched.end_time
        })
        setShowModal(true)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (editSched) {
                await scheduleService.update(editSched.id, formData)
                setSuccess('Schedule updated successfully ✅')
            } else {
                await scheduleService.create(formData)
                setSuccess('Schedule created successfully ✅')
            }
            setShowModal(false)
            fetchSchedules()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this schedule?')) return
        try {
            await scheduleService.delete(id)
            setSuccess('Schedule deleted successfully ✅')
            fetchSchedules()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    // Get scheduled days
    const scheduledDays = schedules.map((s) => s.day_of_week)

    if (loading) {
        return (
            <DashboardLayout title="My Schedule" role="doctor">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading schedule...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="My Schedule" role="doctor">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">🕐 My Schedule</h2>
                        <p className="page-subtitle">
                            {schedules.length} days configured
                        </p>
                    </div>
                    <button className="btn-add" onClick={handleAdd}>
                        + Add Schedule
                    </button>
                </div>

                {/* Alerts */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Week View */}
                <div className="week-grid">
                    {days.map((day) => {
                        const sched = schedules.find((s) => s.day_of_week === day)
                        return (
                            <div
                                key={day}
                                className={`day-card ${sched ? 'active' : 'inactive'}`}
                            >
                                <div className="day-card-header">
                                    <span className="day-name">{day}</span>
                                    {sched ? (
                                        <span className="day-badge active">Working</span>
                                    ) : (
                                        <span className="day-badge off">Day Off</span>
                                    )}
                                </div>
                                {sched ? (
                                    <>
                                        <div className="day-time">
                                            <span>🕐 {sched.start_time}</span>
                                            <span>→</span>
                                            <span>🕐 {sched.end_time}</span>
                                        </div>
                                        <div className="day-actions">
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(sched)}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(sched.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        className="btn-add-day"
                                        onClick={() => {
                                            setFormData({
                                                day_of_week: day,
                                                start_time:  '09:00',
                                                end_time:    '17:00'
                                            })
                                            setEditSched(null)
                                            setShowModal(true)
                                        }}
                                    >
                                        + Add Hours
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>{editSched ? '✏️ Edit Schedule' : '➕ Add Schedule'}</h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            {error && <div className="alert error">{error}</div>}
                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="form-group">
                                    <label>📅 Day of Week</label>
                                    <select
                                        name="day_of_week"
                                        value={formData.day_of_week}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    >
                                        <option value="">Select Day</option>
                                        {days.map((day) => (
                                            <option
                                                key={day}
                                                value={day}
                                                disabled={
                                                    scheduledDays.includes(day) &&
                                                    day !== editSched?.day_of_week
                                                }
                                            >
                                                {day} {scheduledDays.includes(day) &&
                                                    day !== editSched?.day_of_week
                                                    ? '(Already scheduled)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>🕐 Start Time</label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>🕐 End Time</label>
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-save">
                                        {editSched ? '💾 Update' : '➕ Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}

export default MySchedule