import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { appointmentService } from '../../services/api'
import './MyAppointments.css'

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [loading,      setLoading]      = useState(true)
    const [error,        setError]        = useState('')
    const [success,      setSuccess]      = useState('')
    const [search,       setSearch]       = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [showNotes,    setShowNotes]    = useState(null)
    const [notes,        setNotes]        = useState('')

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

    const handleStatusChange = async (id, status) => {
        try {
            await appointmentService.changeStatus(id, { status })
            setSuccess(`Appointment ${status} successfully ✅`)
            fetchAppointments()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const handleNotesSubmit = async (id) => {
        try {
            await appointmentService.update(id, { notes })
            setSuccess('Notes saved successfully ✅')
            setShowNotes(null)
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

    const filteredAppointments = appointments.filter((a) => {
        const matchSearch =
            a.patient_name?.toLowerCase().includes(search.toLowerCase())
        const matchStatus =
            filterStatus === 'all' || a.status === filterStatus
        return matchSearch && matchStatus
    })

    if (loading) {
        return (
            <DashboardLayout title="My Appointments" role="doctor">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading appointments...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="My Appointments" role="doctor">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">📅 My Appointments</h2>
                        <p className="page-subtitle">
                            {appointments.length} total appointments
                        </p>
                    </div>
                </div>

                {/* Alerts */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Filters */}
                <div className="filters-row">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by patient name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-tabs">
                        {['all', 'pending', 'confirmed', 'cancelled'].map((s) => (
                            <button
                                key={s}
                                className={`filter-tab ${filterStatus === s ? 'active' : ''}`}
                                onClick={() => setFilterStatus(s)}
                            >
                                {s === 'all'       ? '📋 All'       :
                                 s === 'pending'   ? '⏳ Pending'   :
                                 s === 'confirmed' ? '✅ Confirmed' :
                                 '❌ Cancelled'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="table-card">
                    {filteredAppointments.length === 0 ? (
                        <div className="empty-state">
                            <p>📅 No appointments found</p>
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
                                        <th>Phone</th>
                                        <th>Notes</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((apt, index) => (
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
                                            <td>{apt.patient_phone || '—'}</td>
                                            <td>
                                                <button
                                                    className="btn-notes"
                                                    onClick={() => {
                                                        setShowNotes(apt.id)
                                                        setNotes(apt.notes || '')
                                                    }}
                                                >
                                                    📝 Notes
                                                </button>
                                            </td>
                                            <td>
                                                <span className={getStatusClass(apt.status)}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    {apt.status === 'pending' && (
                                                        <button
                                                            className="btn-confirm"
                                                            onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                                        >
                                                            ✅
                                                        </button>
                                                    )}
                                                    {apt.status !== 'cancelled' && (
                                                        <button
                                                            className="btn-cancel-appt"
                                                            onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                                        >
                                                            ❌
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Notes Modal */}
                {showNotes && (
                    <div className="modal-overlay" onClick={() => setShowNotes(null)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>📝 Appointment Notes</h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowNotes(null)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="modal-form">
                                <div className="form-group">
                                    <label>Write your notes or prescription:</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Enter notes, diagnosis, prescription..."
                                        className="form-input"
                                        rows="5"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn-cancel"
                                        onClick={() => setShowNotes(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn-save"
                                        onClick={() => handleNotesSubmit(showNotes)}
                                    >
                                        💾 Save Notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}

export default MyAppointments