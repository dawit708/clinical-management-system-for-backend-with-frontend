import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { doctorService      } from '../../services/api'
import { patientService     } from '../../services/api'
import { appointmentService } from '../../services/api'
import { departmentService  } from '../../services/api'
import './AdminHome.css'

const AdminHome = () => {
    const [stats, setStats] = useState({
        doctors:      0,
        patients:     0,
        appointments: 0,
        departments:  0
    })
    const [recentAppointments, setRecentAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const [doctors, patients, appointments, departments] = await Promise.all([
                doctorService.getAll(),
                patientService.getAll(),
                appointmentService.getAll(),
                departmentService.getAll()
            ])

            setStats({
                doctors:      doctors.data.data.length,
                patients:     patients.data.data.length,
                appointments: appointments.data.data.length,
                departments:  departments.data.data.length
            })

            // Get last 5 appointments
            setRecentAppointments(appointments.data.data.slice(0, 5))
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        {
            title: 'Total Doctors',
            value: stats.doctors,
            icon:  '👨‍⚕️',
            color: 'blue',
            desc:  'Registered doctors'
        },
        {
            title: 'Total Patients',
            value: stats.patients,
            icon:  '🧑‍⚕️',
            color: 'green',
            desc:  'Registered patients'
        },
        {
            title: 'Appointments',
            value: stats.appointments,
            icon:  '📅',
            color: 'purple',
            desc:  'Total appointments'
        },
        {
            title: 'Departments',
            value: stats.departments,
            icon:  '🏥',
            color: 'orange',
            desc:  'Active departments'
        }
    ]

    const getStatusClass = (status) => {
        if (status === 'confirmed')  return 'status confirmed'
        if (status === 'cancelled')  return 'status cancelled'
        return 'status pending'
    }

    if (loading) {
        return (
            <DashboardLayout title="Admin Dashboard" role="admin">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Admin Dashboard" role="admin">
            <div className="admin-home">

                {/* Welcome Banner */}
                <div className="welcome-banner">
                    <div className="welcome-text">
                        <h2>Welcome back, Admin! 👑</h2>
                        <p>Here is what is happening in your clinic today</p>
                    </div>
                    <div className="welcome-icon">🏥</div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    {statCards.map((card, index) => (
                        <div key={index} className={`stat-card ${card.color}`}>
                            <div className="stat-card-left">
                                <p className="stat-card-title">{card.title}</p>
                                <h3 className="stat-card-value">{card.value}</h3>
                                <p className="stat-card-desc">{card.desc}</p>
                            </div>
                            <div className="stat-card-icon">{card.icon}</div>
                        </div>
                    ))}
                </div>

                {/* Recent Appointments */}
                <div className="section">
                    <div className="section-header">
                        <h3 className="section-title">📋 Recent Appointments</h3>
                    </div>

                    {recentAppointments.length === 0 ? (
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
                                        <th>Doctor</th>
                                        <th>Department</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentAppointments.map((apt, index) => (
                                        <tr key={apt.id}>
                                            <td>{index + 1}</td>
                                            <td>{apt.patient_name}</td>
                                            <td>{apt.doctor_name}</td>
                                            <td>{apt.department_name}</td>
                                            <td>{new Date(apt.appointment_date)
                                                .toLocaleDateString()}</td>
                                            <td>{apt.appointment_time}</td>
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

export default AdminHome