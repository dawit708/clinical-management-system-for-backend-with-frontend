import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { appointmentService } from '../../services/api'
import './PatientHome.css'

const PatientHome = () => {
    const [appointments, setAppointments] = useState([])
    const [loading,      setLoading]      = useState(true)
    const [stats,        setStats]        = useState({
        total:     0,
        upcoming:  0,
        confirmed: 0,
        pending:   0
    })

    useEffect(() => { fetchAppointments() }, [])

    const fetchAppointments = async () => {
        try {
            const res = await appointmentService.getMyPatient()
            const data = res.data.data
            setAppointments(data)

            const today = new Date().toISOString().split('T')[0]
            const upcoming = data.filter(a =>
                a.appointment_date?.split('T')[0] >= today &&
                a.status !== 'cancelled'
            )

            setStats({
                total:     data.length,
                upcoming:  upcoming.length,
                confirmed: data.filter(a => a.status === 'confirmed').length,
                pending:   data.filter(a => a.status === 'pending').length
            })
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const getUpcomingAppointments = () => {
        const today = new Date().toISOString().split('T')[0]
        return appointments
            .filter(a =>
                a.appointment_date?.split('T')[0] >= today &&
                a.status !== 'cancelled'
            )
            .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))
            .slice(0, 5)
    }

    const getStatusClass = (status) => {
        if (status === 'confirmed') return 'status confirmed'
        if (status === 'cancelled') return 'status cancelled'
        return 'status pending'
    }

    const statCards = [
        { title: 'Total Appointments', value: stats.total,     icon: '📅', color: 'blue'   },
        { title: 'Upcoming',           value: stats.upcoming,  icon: '⏰', color: 'purple' },
        { title: 'Confirmed',          value: stats.confirmed, icon: '✅', color: 'green'  },
        { title: 'Pending',            value: stats.pending,   icon: '⏳', color: 'orange' }
    ]

    if (loading) {
        return (
            <DashboardLayout title="Patient Dashboard" role="patient">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Patient Dashboard" role="patient">
            <div className="patient-home">

                {/* Welcome Banner */}
                <div className="welcome-banner patient">
                    <div className="welcome-text">
                        <h2>Welcome back! 🧑‍⚕️</h2>
                        <p>Manage your health appointments in one place</p>
                        <Link to="/patient/find-doctor" className="quick-book-btn">
                            🔍 Find a Doctor & Book Now
                        </Link>
                    </div>
                    <div className="welcome-icon">🏥</div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    {statCards.map((card, index) => (
                        <div key={index} className={`stat-card ${card.color}`}>
                            <div className="stat-card-left">
                                <p className="stat-card-title">{card.title}</p>
                                <h3 className="stat-card-value">{card.value}</h3>
                            </div>
                            <div className="stat-card-icon">{card.icon}</div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Appointments */}
                <div className="section">
                    <div className="section-header">
                        <h3 className="section-title">⏰ Upcoming Appointments</h3>
                        <Link to="/patient/appointments" className="section-link">
                            View All →
                        </Link>
                    </div>

                    {getUpcomingAppointments().length === 0 ? (
                        <div className="empty-state">
                            <p>📅 No upcoming appointments</p>
                            <Link to="/patient/find-doctor" className="btn-book-empty">
                                + Book an Appointment
                            </Link>
                        </div>
                    ) : (
                        <div className="appointments-list">
                            {getUpcomingAppointments().map((apt) => (
                                <div key={apt.id} className="appointment-item">
                                    <div className="appointment-date-badge">
                                        <span className="appointment-day">
                                            {new Date(apt.appointment_date).getDate()}
                                        </span>
                                        <span className="appointment-month">
                                            {new Date(apt.appointment_date)
                                                .toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="appointment-details">
                                        <h4>{apt.doctor_name}</h4>
                                        <p>{apt.specialty} • {apt.department_name}</p>
                                        <p className="appointment-time-text">
                                            🕐 {apt.appointment_time}
                                        </p>
                                    </div>
                                    <span className={getStatusClass(apt.status)}>
                                        {apt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </DashboardLayout>
    )
}

export default PatientHome