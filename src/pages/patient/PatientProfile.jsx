import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { patientService, authService } from '../../services/api'
import './PatientProfile.css'

const PatientProfile = () => {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('profile')
    const [loading,   setLoading]   = useState(true)
    const [error,     setError]     = useState('')
    const [success,   setSuccess]   = useState('')
    const [photoPreview, setPhotoPreview] = useState(null)
    const [uploadingPhoto, setUploadingPhoto] = useState(false)

    const [profileData, setProfileData] = useState({
        date_of_birth: '',
        phone:         '',
        gender:        '',
        address:       ''
    })

    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password:     '',
        confirm_password: ''
    })

    useEffect(() => { fetchProfile() }, [])

    const fetchProfile = async () => {
        try {
            const res = await patientService.getMe()
            const data = res.data.data
            setProfileData({
                date_of_birth: data.date_of_birth?.split('T')[0] || '',
                phone:         data.phone || '',
                gender:        data.gender || '',
                address:       data.address || ''
            })
            setPhotoPreview(data.profile_photo || null)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 2 * 1024 * 1024) {
            setError('Photo must be less than 2MB ❌')
            return
        }

        setUploadingPhoto(true)
        setError('')

        const reader = new FileReader()
        reader.onloadend = async () => {
            try {
                const base64 = reader.result
                await authService.uploadPhoto({ photo: base64 })
                setPhotoPreview(base64)
                setSuccess('Photo uploaded successfully ✅')
                setTimeout(() => setSuccess(''), 3000)
            } catch (err) {
                setError('Failed to upload photo ❌')
            } finally {
                setUploadingPhoto(false)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleProfileSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await patientService.getMe()
            await patientService.update(res.data.data.id, profileData)
            setSuccess('Profile updated successfully ✅')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (passwordData.new_password !== passwordData.confirm_password) {
            return setError('Passwords do not match ❌')
        }
        if (passwordData.new_password.length < 6) {
            return setError('Password must be at least 6 characters ❌')
        }
        setSuccess('Password changed successfully ✅')
        setPasswordData({
            current_password: '',
            new_password:     '',
            confirm_password: ''
        })
        setTimeout(() => setSuccess(''), 3000)
    }

    const tabs = [
        { id: 'profile',  label: '👤 My Profile'     },
        { id: 'password', label: '🔒 Change Password' }
    ]

    if (loading) {
        return (
            <DashboardLayout title="My Profile" role="patient">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Loading profile...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="My Profile" role="patient">
            <div className="profile-page">

                {/* Profile Banner */}
                <div className="profile-banner">
                    <div className="profile-photo-wrapper">
                        {photoPreview ? (
                            <img src={photoPreview} alt="Profile" className="profile-photo-img" />
                        ) : (
                            <div className="profile-avatar-large">
                                {user?.full_name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <label className="photo-upload-btn">
                            {uploadingPhoto ? '⏳' : '📷'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                style={{ display: 'none' }}
                                disabled={uploadingPhoto}
                            />
                        </label>
                    </div>
                    <div className="profile-banner-info">
                        <h2>{user?.full_name}</h2>
                        <p>📧 {user?.email}</p>
                        <span className="role-badge patient">🧑‍⚕️ Patient</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="settings-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Alerts */}
                {success && <div className="alert success">{success}</div>}
                {error   && <div className="alert error">{error}</div>}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="settings-card">
                        <h3 className="settings-card-title">👤 Personal Information</h3>
                        <form onSubmit={handleProfileSubmit} className="settings-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>👤 Full Name</label>
                                    <input
                                        type="text"
                                        value={user?.full_name}
                                        disabled
                                        className="form-input disabled"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>📧 Email</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="form-input disabled"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>📞 Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleProfileChange}
                                        placeholder="Enter phone number"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>🎂 Date of Birth</label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={profileData.date_of_birth}
                                        onChange={handleProfileChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>⚧ Gender</label>
                                <select
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleProfileChange}
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
                                    value={profileData.address}
                                    onChange={handleProfileChange}
                                    placeholder="Enter your address"
                                    className="form-input"
                                    rows="3"
                                />
                            </div>
                            <div className="settings-footer">
                                <button type="submit" className="btn-save">
                                    💾 Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                    <div className="settings-card">
                        <h3 className="settings-card-title">🔒 Change Password</h3>
                        <form onSubmit={handlePasswordSubmit} className="settings-form">
                            <div className="form-group">
                                <label>🔒 Current Password</label>
                                <input
                                    type="password"
                                    name="current_password"
                                    value={passwordData.current_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>🔑 New Password</label>
                                <input
                                    type="password"
                                    name="new_password"
                                    value={passwordData.new_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>🔐 Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    value={passwordData.confirm_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="settings-footer">
                                <button type="submit" className="btn-save">
                                    🔒 Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}

export default PatientProfile