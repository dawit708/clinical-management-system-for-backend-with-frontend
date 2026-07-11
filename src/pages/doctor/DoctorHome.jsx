import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { appointmentService } from '../../services/api'
import './DoctorHome.css'

const DoctorHome = () => {
    const [appointments, setAppointments] = useState([])
    const [loading,      setLoading]      = useState(true)
    const [stats,        setStats]        = useState({
        total:     0,
        pending:   0,
        confirmed: 0,
        cancelled: 0
    })

    useEffect(() => { fetchAppointments() }, [])

    const fetchAppointments = async () => {
        try {
            const res = await appointmentService.getMyDoctor()
            const data = res.data.data
            setAppointments(data)
            setStats({
                total:     data.length,
                pending:   data.filter(a => a.status === 'pending').length,
                confirmed: data.filter(a => a.status === 'confirmed').length,
                cancelled: data.filter(a => a.status === 'cancelled').length
            })
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const getTodayAppointments = () => {
        const today = new Date().toISOString().split('T')[0]
        return appointments.filter(a =>
            a.appointment_date?.split('T')[0] === today
        )
    }

    const getStatusClass = (status) => {
        if (status === 'confirmed') return 'status confirmed'
        if (status === 'cancelled') return 'status cancelled'
        return 'status pending'
    }

    const statCards = [
        {
            title: 'Total Appointments',
            value: stats.total,
            icon:  '📅',
            color: 'blue'
        },
        {
            title: 'Pending',
            value: stats.pending,
            icon:  '⏳',
            color: 'orange'
        },
        {
            title: 'Confirmed',
            value: stats.confirmed,
            icon:  '✅',
            color: 'green'
        },
        {
            title: 'Cancelled',
            value: stats.cancelled,
            icon:  '❌',
            color: 'red'
        }
    ]

    if (loading) {
        return (
            <DashboardLayout title="Doctor Dashboard" role="doctor">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Doctor Dashboard" role="doctor">
            <div className="doctor-home">

                {/* Welcome Banner */}
                <div className="welcome-banner doctor">
                    <div className="welcome-text">
                        <h2>Welcome back, Doctor! 👨‍⚕️</h2>
                        <p>You have {getTodayAppointments().length} appointments today</p>
                    </div>
                    <div className="welcome-icon">🩺</div>
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

                {/* Today's Appointments */}
                <div className="section">
                    <div className="section-header">
                        <h3 className="section-title">📅 Today's Appointments</h3>
                        <span className="section-count">
                            {getTodayAppointments().length} appointments
                        </span>
                    </div>
                    {getTodayAppointments().length === 0 ? (
                        <div className="empty-state">
                            <p>📅 No appointments today</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Patient</th>
                                        <th>Time</th>
                                        <th>Phone</th>
                                        <th>Gender</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getTodayAppointments().map((apt, index) => (
                                        <tr key={apt.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar green">
                                                        {apt.patient_name?.charAt(0)}
                                                    </div>
                                                    {apt.patient_name}
                                                </div>
                                            </td>
                                            <td>🕐 {apt.appointment_time}</td>
                                            <td>{apt.patient_phone || '—'}</td>
                                            <td>{apt.patient_gender || '—'}</td>
                                            <td>
                                                <span className={getStatusClass(apt.status)}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Upcoming Appointments */}
                <div className="section">
                    <div className="section-header">
                        <h3 className="section-title">📋 Recent Appointments</h3>
                    </div>
                    {appointments.length === 0 ? (
                        <div className="empty-state">
                            <p>📅 No appointments yet</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Patient</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Notes</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.slice(0, 5).map((apt, index) => (
                                        <tr key={apt.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar green">
                                                        {apt.patient_name?.charAt(0)}
                                                    </div>
                                                    {apt.patient_name}
                                                </div>
                                            </td>
                                            <td>
                                                {new Date(apt.appointment_date)
                                                    .toLocaleDateString()}
                                            </td>
                                            <td>🕐 {apt.appointment_time}</td>
                                            <td>{apt.notes || '—'}</td>
                                            <td>
                                                <span className={getStatusClass(apt.status)}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </DashboardLayout>
    )
}

export default DoctorHome