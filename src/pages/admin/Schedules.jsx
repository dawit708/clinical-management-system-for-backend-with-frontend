import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { scheduleService, doctorService } from '../../services/api'
import './Schedules.css'

const Schedules = () => {
    const [schedules,   setSchedules]   = useState([])
    const [doctors,     setDoctors]     = useState([])
    const [loading,     setLoading]     = useState(true)
    const [error,       setError]       = useState('')
    const [success,     setSuccess]     = useState('')
    const [filterDoctor, setFilterDoctor] = useState('all')

    const days = [
        'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const [schedulesRes, doctorsRes] = await Promise.all([
                scheduleService.getAll(),
                doctorService.getAll()
            ])
            setSchedules(schedulesRes.data.data)
            setDoctors(doctorsRes.data.data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this schedule?')) return
        try {
            await scheduleService.delete(id)
            setSuccess('Schedule deleted successfully ✅')
            fetchData()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const filteredSchedules = schedules.filter((s) =>
        filterDoctor === 'all' || s.doctor_id === parseInt(filterDoctor)
    )

    if (loading) {
        return (
            <DashboardLayout title="Schedules" role="admin">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading schedules...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Schedules" role="admin">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">🕐 Doctor Schedules</h2>
                        <p className="page-subtitle">
                            {schedules.length} schedules configured
                        </p>
                    </div>
                </div>

                {/* Alerts */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Filter */}
                <div className="filter-row">
                    <label className="filter-label">Filter by Doctor:</label>
                    <select
                        className="filter-select"
                        value={filterDoctor}
                        onChange={(e) => setFilterDoctor(e.target.value)}
                    >
                        <option value="all">All Doctors</option>
                        {doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.full_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Schedule Table */}
                <div className="table-card">
                    {filteredSchedules.length === 0 ? (
                        <div className="empty-state">
                            <p>🕐 No schedules found</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Doctor</th>
                                        <th>Specialty</th>
                                        <th>Day</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSchedules.map((s, index) => (
                                        <tr key={s.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar blue">
                                                        {s.doctor_name?.charAt(0)}
                                                    </div>
                                                    {s.doctor_name}
                                                </div>
                                            </td>
                                            <td>{s.specialty}</td>
                                            <td>
                                                <span className={`day-badge ${s.day_of_week?.toLowerCase()}`}>
                                                    {s.day_of_week}
                                                </span>
                                            </td>
                                            <td>🕐 {s.start_time}</td>
                                            <td>🕐 {s.end_time}</td>
                                            <td>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(s.id)}
                                                >
                                                    🗑️ Delete
                                                </button>
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

export default Schedules