import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { appointmentService } from '../../services/api'
import './PatientDetail.css'

const PatientDetail = () => {
    const [appointments, setAppointments] = useState([])
    const [loading,      setLoading]      = useState(true)
    const [search,       setSearch]       = useState('')
    const [selected,     setSelected]     = useState(null)

    useEffect(() => { fetchAppointments() }, [])

    const fetchAppointments = async () => {
        try {
            const res = await appointmentService.getMyDoctor()
            setAppointments(res.data.data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    // Get unique patients from appointments
    const getUniquePatients = () => {
        const seen = new Set()
        return appointments.filter((apt) => {
            if (seen.has(apt.patient_id)) return false
            seen.add(apt.patient_id)
            return true
        })
    }

    const getPatientAppointments = (patientId) => {
        return appointments.filter((a) => a.patient_id === patientId)
    }

    const getStatusClass = (status) => {
        if (status === 'confirmed') return 'status confirmed'
        if (status === 'cancelled') return 'status cancelled'
        return 'status pending'
    }

    const filteredPatients = getUniquePatients().filter((p) =>
        p.patient_name?.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <DashboardLayout title="My Patients" role="doctor">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading patients...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="My Patients" role="doctor">
            <div className="patient-detail-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">🧑‍⚕️ My Patients</h2>
                        <p className="page-subtitle">
                            {getUniquePatients().length} patients visited
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search patient by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="patient-layout">

                    {/* Patient List */}
                    <div className="patient-list">
                        {filteredPatients.length === 0 ? (
                            <div className="empty-state">
                                <p>🧑‍⚕️ No patients found</p>
                            </div>
                        ) : (
                            filteredPatients.map((apt) => (
                                <div
                                    key={apt.patient_id}
                                    className={`patient-card ${selected?.patient_id === apt.patient_id ? 'active' : ''}`}
                                    onClick={() => setSelected(apt)}
                                >
                                    <div className="patient-card-avatar">
                                        {apt.patient_name?.charAt(0)}
                                    </div>
                                    <div className="patient-card-info">
                                        <h4>{apt.patient_name}</h4>
                                        <p>
                                            {getPatientAppointments(apt.patient_id).length} visits
                                        </p>
                                    </div>
                                    <span className={getStatusClass(apt.status)}>
                                        {apt.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Patient Detail */}
                    <div className="patient-detail">
                        {!selected ? (
                            <div className="select-prompt">
                                <div className="select-prompt-icon">👈</div>
                                <p>Select a patient to view details</p>
                            </div>
                        ) : (
                            <>
                                {/* Patient Info */}
                                <div className="detail-card">
                                    <div className="detail-header">
                                        <div className="detail-avatar">
                                            {selected.patient_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h3>{selected.patient_name}</h3>
                                            <p>📞 {selected.patient_phone || 'No phone'}</p>
                                            <p>⚧ {selected.patient_gender || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="detail-stats">
                                        <div className="detail-stat">
                                            <span className="detail-stat-value">
                                                {getPatientAppointments(selected.patient_id).length}
                                            </span>
                                            <span className="detail-stat-label">Total Visits</span>
                                        </div>
                                        <div className="detail-stat">
                                            <span className="detail-stat-value">
                                                {getPatientAppointments(selected.patient_id)
                                                    .filter(a => a.status === 'confirmed').length}
                                            </span>
                                            <span className="detail-stat-label">Confirmed</span>
                                        </div>
                                        <div className="detail-stat">
                                            <span className="detail-stat-value">
                                                {getPatientAppointments(selected.patient_id)
                                                    .filter(a => a.status === 'pending').length}
                                            </span>
                                            <span className="detail-stat-label">Pending</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment History */}
                                <div className="section">
                                    <div className="section-header">
                                        <h3 className="section-title">📋 Appointment History</h3>
                                    </div>
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Status</th>
                                                    <th>Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getPatientAppointments(selected.patient_id)
                                                    .map((apt) => (
                                                    <tr key={apt.id}>
                                                        <td>
                                                            {new Date(apt.appointment_date)
                                                                .toLocaleDateString()}
                                                        </td>
                                                        <td>🕐 {apt.appointment_time}</td>
                                                        <td>
                                                            <span className={getStatusClass(apt.status)}>
                                                                {apt.status}
                                                            </span>
                                                        </td>
                                                        <td>{apt.notes || '—'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default PatientDetail