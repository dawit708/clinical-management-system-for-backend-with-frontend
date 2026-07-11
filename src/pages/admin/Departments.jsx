import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { departmentService } from '../../services/api'
import './Departments.css'

const Departments = () => {
    const [departments, setDepartments] = useState([])
    const [loading,     setLoading]     = useState(true)
    const [showModal,   setShowModal]   = useState(false)
    const [editDept,    setEditDept]    = useState(null)
    const [error,       setError]       = useState('')
    const [success,     setSuccess]     = useState('')
    const [formData,    setFormData]    = useState({
        name:        '',
        description: ''
    })

    useEffect(() => { fetchDepartments() }, [])

    const fetchDepartments = async () => {
        try {
            const res = await departmentService.getAll()
            setDepartments(res.data.data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        setEditDept(null)
        setFormData({ name: '', description: '' })
        setShowModal(true)
        setError('')
    }

    const handleEdit = (dept) => {
        setEditDept(dept)
        setFormData({
            name:        dept.name,
            description: dept.description || ''
        })
        setShowModal(true)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (editDept) {
                await departmentService.update(editDept.id, formData)
                setSuccess('Department updated successfully ✅')
            } else {
                await departmentService.create(formData)
                setSuccess('Department created successfully ✅')
            }
            setShowModal(false)
            fetchDepartments()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return
        try {
            await departmentService.delete(id)
            setSuccess('Department deleted successfully ✅')
            fetchDepartments()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const deptIcons = [
        '❤️', '🦷', '🧠', '🦴', '👶', '🏥',
        '👁️', '🫁', '🩺', '💊'
    ]

    if (loading) {
        return (
            <DashboardLayout title="Departments" role="admin">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading departments...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Departments" role="admin">
            <div className="manage-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">🏥 Departments</h2>
                        <p className="page-subtitle">
                            {departments.length} departments active
                        </p>
                    </div>
                    <button className="btn-add" onClick={handleAdd}>
                        + Add Department
                    </button>
                </div>

                {/* Alerts */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Department Cards */}
                <div className="dept-grid">
                    {departments.length === 0 ? (
                        <div className="empty-state">
                            <p>🏥 No departments found</p>
                            <button className="btn-add" onClick={handleAdd}>
                                Add First Department
                            </button>
                        </div>
                    ) : (
                        departments.map((dept, index) => (
                            <div key={dept.id} className="dept-card">
                                <div className="dept-card-icon">
                                    {deptIcons[index % deptIcons.length]}
                                </div>
                                <div className="dept-card-body">
                                    <h3 className="dept-card-name">{dept.name}</h3>
                                    <p className="dept-card-desc">
                                        {dept.description || 'No description'}
                                    </p>
                                </div>
                                <div className="dept-card-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(dept)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(dept.id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>{editDept ? '✏️ Edit Department' : '➕ Add Department'}</h3>
                                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                            </div>
                            {error && <div className="alert error">{error}</div>}
                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="form-group">
                                    <label>🏥 Department Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Cardiology"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>📝 Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Department description"
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
                                        {editDept ? '💾 Update' : '➕ Add'}
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

export default Departments