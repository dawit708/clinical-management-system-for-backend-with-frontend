import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import './Settings.css'

const Settings = () => {
    const [success, setSuccess] = useState('')
    const [activeTab, setActiveTab] = useState('clinic')
    const [clinicData, setClinicData] = useState({
        clinic_name:  'City Clinic',
        email:        'info@clinic.com',
        phone:        '+251911234567',
        address:      'Addis Ababa, Ethiopia',
        working_from: '08:00',
        working_to:   '18:00',
        website:      'www.cityclinic.com'
    })
    const [passwordData, setPasswordData] = useState({
        current_password:  '',
        new_password:      '',
        confirm_password:  ''
    })
    const [passwordError,   setPasswordError]   = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')

    const handleClinicChange = (e) => {
        setClinicData({ ...clinicData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleClinicSubmit = (e) => {
        e.preventDefault()
        setSuccess('Clinic settings saved successfully ✅')
        setTimeout(() => setSuccess(''), 3000)
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setPasswordError('')
        if (passwordData.new_password !== passwordData.confirm_password) {
            return setPasswordError('Passwords do not match ❌')
        }
        if (passwordData.new_password.length < 6) {
            return setPasswordError('Password must be at least 6 characters ❌')
        }
        setPasswordSuccess('Password changed successfully ✅')
        setPasswordData({
            current_password: '',
            new_password:     '',
            confirm_password: ''
        })
        setTimeout(() => setPasswordSuccess(''), 3000)
    }

    const tabs = [
        { id: 'clinic',   label: '🏥 Clinic Info'   },
        { id: 'password', label: '🔒 Change Password' },
        { id: 'system',   label: '⚙️ System'          }
    ]

    return (
        <DashboardLayout title="Settings" role="admin">
            <div className="settings-page">

                {/* Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">⚙️ Settings</h2>
                        <p className="page-subtitle">
                            Manage your clinic settings
                        </p>
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

                {/* Clinic Info Tab */}
                {activeTab === 'clinic' && (
                    <div className="settings-card">
                        <h3 className="settings-card-title">🏥 Clinic Information</h3>
                        {success && <div className="alert success">{success}</div>}
                        <form onSubmit={handleClinicSubmit} className="settings-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>🏥 Clinic Name</label>
                                    <input
                                        type="text"
                                        name="clinic_name"
                                        value={clinicData.clinic_name}
                                        onChange={handleClinicChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>📧 Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={clinicData.email}
                                        onChange={handleClinicChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>📞 Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={clinicData.phone}
                                        onChange={handleClinicChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>🌐 Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={clinicData.website}
                                        onChange={handleClinicChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>🏠 Address</label>
                                <textarea
                                    name="address"
                                    value={clinicData.address}
                                    onChange={handleClinicChange}
                                    className="form-input"
                                    rows="2"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>🕐 Working Hours From</label>
                                    <input
                                        type="time"
                                        name="working_from"
                                        value={clinicData.working_from}
                                        onChange={handleClinicChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>🕐 Working Hours To</label>
                                    <input
                                        type="time"
                                        name="working_to"
                                        value={clinicData.working_to}
                                        onChange={handleClinicChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="settings-footer">
                                <button type="submit" className="btn-save">
                                    💾 Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                    <div className="settings-card">
                        <h3 className="settings-card-title">🔒 Change Password</h3>
                        {passwordError   && <div className="alert error">{passwordError}</div>}
                        {passwordSuccess && <div className="alert success">{passwordSuccess}</div>}
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
                                <label>🔐 Confirm New Password</label>
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

                {/* System Tab */}
                {activeTab === 'system' && (
                    <div className="settings-card">
                        <h3 className="settings-card-title">⚙️ System Information</h3>
                        <div className="system-info">
                            <div className="system-info-row">
                                <span className="system-info-label">🖥️ System</span>
                                <span className="system-info-value">
                                    Clinic Management System v1.0
                                </span>
                            </div>
                            <div className="system-info-row">
                                <span className="system-info-label">⚙️ Backend</span>
                                <span className="system-info-value">Node.js + Express.js</span>
                            </div>
                            <div className="system-info-row">
                                <span className="system-info-label">🗄️ Database</span>
                                <span className="system-info-value">MySQL (MAMP)</span>
                            </div>
                            <div className="system-info-row">
                                <span className="system-info-label">⚛️ Frontend</span>
                                <span className="system-info-value">React.js + Vite</span>
                            </div>
                            <div className="system-info-row">
                                <span className="system-info-label">🔐 Auth</span>
                                <span className="system-info-value">JWT + bcryptjs</span>
                            </div>
                            <div className="system-info-row">
                                <span className="system-info-label">📅 Version</span>
                                <span className="system-info-value">1.0.0</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}

export default Settings