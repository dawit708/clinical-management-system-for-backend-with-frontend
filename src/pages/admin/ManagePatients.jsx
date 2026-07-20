import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { patientService } from '../../services/api'
import './ManagePatients.css'

const ManagePatients = () => {
    const [patients,  setPatients]  = useState([])
    const [loading,   setLoading]   = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editPatient, setEditPatient] = useState(null)
    const [error,     setError]     = useState('')
    const [success,   setSuccess]   = useState('')
    const [search,    setSearch]    = useState('')
    const [formData,  setFormData]  = useState({
        full_name:     '',
        email:         '',
        password:      '',
        date_of_birth: '',
        phone:         '',
        gender:        '',
        address:       ''
    })

    useEffect(() => {
        fetchPatients()
    }, [])

    const fetchPatients = async () => {
        try {
            const res = await patientService.getAll()
            setPatients(res.data.data)
        } catch (error) {
            console.error('Error fetching patients:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        setEditPatient(null)
        setFormData({
            full_name:     '',
            email:         '',
            password:      '',
            date_of_birth: '',
            phone:         '',
            gender:        '',
            address:       ''
        })
        setShowModal(true)
        setError('')
    }

    const handleEdit = (patient) => {
        setEditPatient(patient)
        setFormData({
            full_name:     patient.full_name,
            email:         patient.email,
            password:      '',
            date_of_birth: patient.date_of_birth?.split('T')[0] || '',
            phone:         patient.phone || '',
            gender:        patient.gender || '',
            address:       patient.address || ''
        })
        setShowModal(true)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (editPatient) {
                await patientService.update(editPatient.id, {
                    date_of_birth: formData.date_of_birth,
                    phone:         formData.phone,
                    gender:        formData.gender,
                    address:       formData.address
                })
                setSuccess('Patient updated successfully ✅')
            } else {
                await patientService.create(formData)
                setSuccess('Patient created successfully ✅')
            }
            setShowModal(false)
            fetchPatients()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this patient?')) return
        try {
            await patientService.delete(id)
            setSuccess('Patient deleted successfully ✅')
            fetchPatients()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    // Search filter
    const filteredPatients = patients.filter((p) =>
        p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase()) ||
        p.phone?.includes(search)
    )

    if (loading) {
        return (
            <DashboardLayout title="Manage Patients" role="admin">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading patients...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Manage Patients" role="admin">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">🧑‍⚕️ Manage Patients</h2>
                        <p className="page-subtitle">
                            {patients.length} patients registered
                        </p>
                    </div>
                    <button className="btn-add" onClick={handleAdd}>
                        + Add Patient
                    </button>
                </div>

                {/* Success */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Search */}
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Table */}
                <div className="table-card">
                    {filteredPatients.length === 0 ? (
                        <div className="empty-state">
                            <p>🧑‍⚕️ No patients found</p>
                            <button className="btn-add" onClick={handleAdd}>
                                Add First Patient
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
                                        <th>Phone</th>
                                        <th>Gender</th>
                                        <th>Date of Birth</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.map((patient, index) => (
                                        <tr key={patient.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="patient-name">
                                                    <div className="avatar">
                                                        {patient.full_name?.charAt(0)}
                                                    </div>
                                                    {patient.full_name}
                                                </div>
                                            </td>
                                            <td>{patient.email}</td>
                                            <td>{patient.phone || '—'}</td>
                                            <td>
                                                {patient.gender ? (
                                                    <span className={`badge gender-${patient.gender?.toLowerCase()}`}>
                                                        {patient.gender}
                                                    </span>
                                                ) : '—'}
                                            </td>
                                            <td>
                                                {patient.date_of_birth
                                                    ? new Date(patient.date_of_birth)
                                                        .toLocaleDateString()
                                                    : '—'}
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEdit(patient)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleDelete(patient.id)}
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
                                <h3>{editPatient ? '✏️ Edit Patient' : '➕ Add Patient'}</h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            {error && <div className="alert error">{error}</div>}

                            <form onSubmit={handleSubmit} className="modal-form">

                                {!editPatient && (
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
                                    <label>📞 Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>🎂 Date of Birth</label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>⚧ Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>🏠 Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter address"
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
                                        {editPatient ? '💾 Update' : '➕ Add Patient'}
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

export default ManagePatients