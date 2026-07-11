import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
 import { doctorService } from '../../services/api'
//import { doctorService, authService } from '../../services/api'
import './DoctorProfile.css'

const DoctorProfile = () => {
    const { user } = useAuth()
    const [success, setSuccess] = useState('')
    const [error,   setError]   = useState('')
    const [activeTab, setActiveTab] = useState('profile')
    const [profileData, setProfileData] = useState({
        specialty:  '',
        bio:        '',
        available:  true
    })
    const [passwordData, setPasswordData] = useState({
        current_password:  '',
        new_password:      '',
        confirm_password:  ''
    })

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleProfileSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            setSuccess('Profile updated successfully ✅')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Something went wrong')
        }
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (passwordData.new_password !== passwordData.confirm_password) {
            return setError('Passwords do not match ❌')
        }
        if (passwordData.new_password.length < 6) {
            return setError('Password must be at least 6 characters')
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
        { id: 'profile',  label: '👤 My Profile'      },
        { id: 'password', label: '🔒 Change Password'  }
    ]

    return (
        <DashboardLayout title="My Profile" role="doctor">
            <div className="profile-page">

                {/* Profile Header */}
                <div className="profile-banner">
                    <div className="profile-avatar-large">
                        {user?.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-banner-info">
                        <h2>{user?.full_name}</h2>
                        <p>📧 {user?.email}</p>
                        <span className="role-badge doctor">👨‍⚕️ Doctor</span>
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
                        <h3 className="settings-card-title">👤 Profile Information</h3>
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
                            <div className="form-group">
                                <label>🩺 Specialty</label>
                                <input
                                    type="text"
                                    name="specialty"
                                    value={profileData.specialty}
                                    onChange={handleProfileChange}
                                    placeholder="e.g. Cardiology"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>📌 Availability</label>
                                <select
                                    name="available"
                                    value={profileData.available}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                >
                                    <option value={true}>✅ Available</option>
                                    <option value={false}>❌ Unavailable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>📝 Bio</label>
                                <textarea
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleProfileChange}
                                    placeholder="Write about yourself..."
                                    className="form-input"
                                    rows="4"
                                />
                            </div>
                            <div className="settings-footer">
                                <button type="submit" className="btn-save">
                                    💾 Save Profile
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

export default DoctorProfile
