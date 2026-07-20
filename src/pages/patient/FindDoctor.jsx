import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { doctorService, departmentService } from '../../services/api'
import './FindDoctor.css'

const FindDoctor = () => {
    const navigate = useNavigate()
    const [doctors,     setDoctors]     = useState([])
    const [departments, setDepartments] = useState([])
    const [loading,      setLoading]     = useState(true)
    const [search,       setSearch]      = useState('')
    const [selectedDept, setSelectedDept] = useState('all')

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const [doctorsRes, departmentsRes] = await Promise.all([
                doctorService.getAll(),
                departmentService.getAll()
            ])
            setDoctors(doctorsRes.data.data.filter(d => d.available))
            setDepartments(departmentsRes.data.data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleBookNow = (doctorId) => {
        navigate(`/patient/book-appointment?doctor=${doctorId}`)
    }

    const filteredDoctors = doctors.filter((d) => {
        const matchSearch =
            d.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            d.specialty?.toLowerCase().includes(search.toLowerCase())
        const matchDept =
            selectedDept === 'all' || d.department_id === parseInt(selectedDept)
        return matchSearch && matchDept
    })

    const deptIcons = ['❤️', '🦷', '🧠', '🦴', '👶', '🏥', '👁️', '🫁', '🩺', '💊']

    if (loading) {
        return (
            <DashboardLayout title="Find a Doctor" role="patient">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading doctors...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Find a Doctor" role="patient">
            <div className="find-doctor-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">🔍 Find a Doctor</h2>
                        <p className="page-subtitle">
                            {filteredDoctors.length} doctors available
                        </p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="filters-row">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <select
                        className="dept-filter"
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                    >
                        <option value="all">All Departments</option>
                        {departments.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                                {dep.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Department Chips */}
                <div className="dept-chips">
                    <button
                        className={`dept-chip ${selectedDept === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedDept('all')}
                    >
                        🏥 All
                    </button>
                    {departments.map((dep, index) => (
                        <button
                            key={dep.id}
                            className={`dept-chip ${selectedDept === String(dep.id) ? 'active' : ''}`}
                            onClick={() => setSelectedDept(String(dep.id))}
                        >
                            {deptIcons[index % deptIcons.length]} {dep.name}
                        </button>
                    ))}
                </div>

                {/* Doctors Grid */}
                {filteredDoctors.length === 0 ? (
                    <div className="empty-state">
                        <p>🔍 No doctors found</p>
                    </div>
                ) : (
                    <div className="doctors-grid">
                        {filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="doctor-card">
                                <div className="doctor-card-header">
                                    <div className="doctor-avatar">
                                        {doctor.full_name?.charAt(0)}
                                    </div>
                                    <span className="available-badge">✅ Available</span>
                                </div>
                                <h3 className="doctor-card-name">{doctor.full_name}</h3>
                                <p className="doctor-card-specialty">
                                    🩺 {doctor.specialty}
                                </p>
                                <p className="doctor-card-dept">
                                    🏥 {doctor.department_name || 'General'}
                                </p>
                                {doctor.bio && (
                                    <p className="doctor-card-bio">{doctor.bio}</p>
                                )}
                                <button
                                    className="btn-book"
                                    onClick={() => handleBookNow(doctor.id)}
                                >
                                    📅 Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}

export default FindDoctor