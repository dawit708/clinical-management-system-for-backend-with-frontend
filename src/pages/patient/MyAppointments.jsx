import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { appointmentService } from '../../services/api'
import './MyAppointments.css'

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [loading,      setLoading]      = useState(true)
    const [error,        setError]        = useState('')
    const [success,      setSuccess]      = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    useEffect(() => { fetchAppointments() }, [])

    const fetchAppointments = async () => {
        try {
            const res = await appointmentService.getMyPatient()
            setAppointments(res.data.data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return
        try {
            await appointmentService.changeStatus(id, { status: 'cancelled' })
            setSuccess('Appointment cancelled successfully ✅')
            fetchAppointments()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const getStatusClass = (status) => {
        if (status === 'confirmed') return 'status confirmed'
        if (status === 'cancelled') return 'status cancelled'
        return 'status pending'
    }

    const isPast = (dateStr) => {
        const today = new Date().toISOString().split('T')[0]
        return dateStr?.split('T')[0] < today
    }

    const filteredAppointments = appointments.filter((a) => {
        if (filterStatus === 'all')       return true
        if (filterStatus === 'upcoming')  return !isPast(a.appointment_date) && a.status !== 'cancelled'
        if (filterStatus === 'past')      return isPast(a.appointment_date)
        return a.status === filterStatus
    })

    if (loading) {
        return (
            <DashboardLayout title="My Appointments" role="patient">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading appointments...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="My Appointments" role="patient">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">📅 My Appointments</h2>
                        <p className="page-subtitle">
                            {appointments.length} total appointments
                        </p>
                    </div>
                    <Link to="/patient/find-doctor" className="btn-add">
                        + Book New
                    </Link>
                </div>

                {/* Alerts */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    {[
                        { id: 'all',       label: '📋 All'       },
                        { id: 'upcoming',  label: '⏰ Upcoming'  },
                        { id: 'confirmed', label: '✅ Confirmed' },
                        { id: 'pending',   label: '⏳ Pending'   },
                        { id: 'cancelled', label: '❌ Cancelled' },
                        { id: 'past',      label: '📜 Past'      }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`filter-tab ${filterStatus === tab.id ? 'active' : ''}`}
                            onClick={() => setFilterStatus(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Appointments List */}
                {filteredAppointments.length === 0 ? (
                    <div className="empty-state">
                        <p>📅 No appointments found</p>
                        <Link to="/patient/find-doctor" className="btn-book-empty">
                            + Book an Appointment
                        </Link>
                    </div>
                ) : (
                    <div className="appt-cards">
                        {filteredAppointments.map((apt) => (
                            <div key={apt.id} className="appt-card">
                                <div className="appt-card-left">
                                    <div className="appt-date-box">
                                        <span className="appt-day">
                                            {new Date(apt.appointment_date).getDate()}
                                        </span>
                                        <span className="appt-month">
                                            {new Date(apt.appointment_date)
                                                .toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="appt-info">
                                        <h4>{apt.doctor_name}</h4>
                                        <p>{apt.specialty} • {apt.department_name}</p>
                                        <p className="appt-time">🕐 {apt.appointment_time}</p>
                                        {apt.notes && (
                                            <p className="appt-notes">📝 {apt.notes}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="appt-card-right">
                                    <span className={getStatusClass(apt.status)}>
                                        {apt.status}
                                    </span>
                                    {apt.status !== 'cancelled' && !isPast(apt.appointment_date) && (
                                        <button
                                            className="btn-cancel-appt"
                                            onClick={() => handleCancel(apt.id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}

export default MyAppointments