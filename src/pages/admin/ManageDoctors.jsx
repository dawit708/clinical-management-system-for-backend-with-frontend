import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { doctorService, departmentService } from '../../services/api'
import './ManageDoctors.css'

const ManageDoctors = () => {
    const [doctors,     setDoctors]     = useState([])
    const [departments, setDepartments] = useState([])
    const [loading,     setLoading]     = useState(true)
    const [showModal,   setShowModal]   = useState(false)
    const [editDoctor,  setEditDoctor]  = useState(null)
    const [error,       setError]       = useState('')
    const [success,     setSuccess]     = useState('')
    const [formData,    setFormData]    = useState({
        full_name:     '',
        email:         '',
        password:      '',
        specialty:     '',
        department_id: '',
        bio:           '',
        available:     true
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [doctorsRes, departmentsRes] = await Promise.all([
                doctorService.getAll(),
                departmentService.getAll()
            ])
            setDoctors(doctorsRes.data.data)
            setDepartments(departmentsRes.data.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        setEditDoctor(null)
        setFormData({
            full_name:     '',
            email:         '',
            password:      '',
            specialty:     '',
            department_id: '',
            bio:           '',
            available:     true
        })
        setShowModal(true)
        setError('')
    }

    const handleEdit = (doctor) => {
        setEditDoctor(doctor)
        setFormData({
            full_name:     doctor.full_name,
            email:         doctor.email,
            password:      '',
            specialty:     doctor.specialty,
            department_id: doctor.department_id,
            bio:           doctor.bio || '',
            available:     doctor.available
        })
        setShowModal(true)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (editDoctor) {
                await doctorService.update(editDoctor.id, {
                    specialty:     formData.specialty,
                    department_id: formData.department_id,
                    bio:           formData.bio,
                    available:     formData.available
                })
                setSuccess('Doctor updated successfully ✅')
            } else {
                await doctorService.create(formData)
                setSuccess('Doctor created successfully ✅')
            }
            setShowModal(false)
            fetchData()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this doctor?')) return
        try {
            await doctorService.delete(id)
            setSuccess('Doctor deleted successfully ✅')
            fetchData()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    if (loading) {
        return (
            <DashboardLayout title="Manage Doctors" role="admin">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading doctors...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Manage Doctors" role="admin">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">👨‍⚕️ Manage Doctors</h2>
                        <p className="page-subtitle">
                            {doctors.length} doctors registered
                        </p>
                    </div>
                    <button className="btn-add" onClick={handleAdd}>
                        + Add Doctor
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="alert success">{success}</div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="alert error">{error}</div>
                )}

                {/* Table */}
                <div className="table-card">
                    {doctors.length === 0 ? (
                        <div className="empty-state">
                            <p>👨‍⚕️ No doctors found</p>
                            <button className="btn-add" onClick={handleAdd}>
                                Add First Doctor
                            </button>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Specialty</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map((doctor, index) => (
                                        <tr key={doctor.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="doctor-name">
                                                    <div className="avatar">
                                                        {doctor.full_name?.charAt(0)}
                                                    </div>
                                                    {doctor.full_name}
                                                </div>
                                            </td>
                                            <td>{doctor.email}</td>
                                            <td>{doctor.specialty}</td>
                                            <td>{doctor.department_name || '—'}</td>
                                            <td>
                                                <span className={`badge ${doctor.available ? 'available' : 'unavailable'}`}>
                                                    {doctor.available ? '✅ Available' : '❌ Unavailable'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEdit(doctor)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleDelete(doctor.id)}
                                                    >
                                                        🗑️ Delete
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

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>

                            <div className="modal-header">
                                <h3>{editDoctor ? '✏️ Edit Doctor' : '➕ Add Doctor'}</h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            {error && <div className="alert error">{error}</div>}

                            <form onSubmit={handleSubmit} className="modal-form">

                                {!editDoctor && (
                                    <>
                                        <div className="form-group">
                                            <label>👤 Full Name</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                required
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>📧 Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter email"
                                                required
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>🔒 Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter password"
                                                required
                                                className="form-input"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="form-group">
                                    <label>🩺 Specialty</label>
                                    <input
                                        type="text"
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        placeholder="e.g. Cardiology"
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>🏥 Department</label>
                                    <select
                                        name="department_id"
                                        value={formData.department_id}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dep) => (
                                            <option key={dep.id} value={dep.id}>
                                                {dep.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>📝 Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Doctor description"
                                        className="form-input"
                                        rows="3"
                                    />
                                </div>

                                {editDoctor && (
                                    <div className="form-group">
                                        <label>📌 Availability</label>
                                        <select
                                            name="available"
                                            value={formData.available}
                                            onChange={handleChange}
                                            className="form-input"
                                        >
                                            <option value={true}>✅ Available</option>
                                            <option value={false}>❌ Unavailable</option>
                                        </select>
                                    </div>
                                )}

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-save">
                                        {editDoctor ? '💾 Update' : '➕ Add Doctor'}
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

export default ManageDoctors