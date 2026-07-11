import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { appointmentService } from '../../services/api'
import './ManageAppointments.css'

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [loading,      setLoading]      = useState(true)
    const [showModal,    setShowModal]    = useState(false)
    const [editAppt,     setEditAppt]     = useState(null)
    const [error,        setError]        = useState('')
    const [success,      setSuccess]      = useState('')
    const [search,       setSearch]       = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [formData,     setFormData]     = useState({
        appointment_date: '',
        appointment_time: '',
        status:           'pending',
        notes:            ''
    })

    useEffect(() => {
        fetchAppointments()
    }, [])

    const fetchAppointments = async () => {
        try {
            const res = await appointmentService.getAll()
            setAppointments(res.data.data)
        } catch (error) {
            console.error('Error fetching appointments:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEdit = (appt) => {
        setEditAppt(appt)
        setFormData({
            appointment_date: appt.appointment_date?.split('T')[0] || '',
            appointment_time: appt.appointment_time || '',
            status:           appt.status || 'pending',
            notes:            appt.notes || ''
        })
        setShowModal(true)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await appointmentService.update(editAppt.id, formData)
            setSuccess('Appointment updated successfully ✅')
            setShowModal(false)
            fetchAppointments()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return
        try {
            await appointmentService.delete(id)
            setSuccess('Appointment deleted successfully ✅')
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

    // Filter appointments
    const filteredAppointments = appointments.filter((a) => {
        const matchSearch =
            a.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
            a.doctor_name?.toLowerCase().includes(search.toLowerCase()) ||
            a.department_name?.toLowerCase().includes(search.toLowerCase())
        const matchStatus =
            filterStatus === 'all' || a.status === filterStatus
        return matchSearch && matchStatus
    })

    if (loading) {
        return (
            <DashboardLayout title="Manage Appointments" role="admin">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading appointments...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Manage Appointments" role="admin">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">📅 Manage Appointments</h2>
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
                            placeholder="Search by patient, doctor..."
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
                                        <th>Doctor</th>
                                        <th>Department</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((appt, index) => (
                                        <tr key={appt.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar blue">
                                                        {appt.patient_name?.charAt(0)}
                                                    </div>
                                                    {appt.patient_name}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar green">
                                                        {appt.doctor_name?.charAt(0)}
                                                    </div>
                                                    {appt.doctor_name}
                                                </div>
                                            </td>
                                            <td>{appt.department_name || '—'}</td>
                                            <td>
                                                {new Date(appt.appointment_date)
                                                    .toLocaleDateString()}
                                            </td>
                                            <td>{appt.appointment_time}</td>
                                            <td>
                                                <span className={getStatusClass(appt.status)}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    {appt.status === 'pending' && (
                                                        <button
                                                            className="btn-confirm"
                                                            onClick={() => handleStatusChange(appt.id, 'confirmed')}
                                                        >
                                                            ✅
                                                        </button>
                                                    )}
                                                    {appt.status !== 'cancelled' && (
                                                        <button
                                                            className="btn-cancel-appt"
                                                            onClick={() => handleStatusChange(appt.id, 'cancelled')}
                                                        >
                                                            ❌
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEdit(appt)}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleDelete(appt.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Edit Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>

                            <div className="modal-header">
                                <h3>✏️ Edit Appointment</h3>
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
                                    <label>📅 Date</label>
                                    <input
                                        type="date"
                                        name="appointment_date"
                                        value={formData.appointment_date}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
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

                                <div className="form-group">
                                    <label>📌 Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        <option value="pending">⏳ Pending</option>
                                        <option value="confirmed">✅ Confirmed</option>
                                        <option value="cancelled">❌ Cancelled</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>📝 Notes</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Add notes..."
                                        className="form-input"
                                        rows="3"
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
                                        💾 Update
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

export default ManageAppointments