import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Register.css'

const Register = () => {
    const { register } = useAuth()
    const navigate     = useNavigate()

    const [formData, setFormData] = useState({
        full_name: '',
        email:     '',
        password:  '',
        confirm_password: '',
        role:      'patient'
    })
    const [error,   setError]   = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        // Check passwords match
        if (formData.password !== formData.confirm_password) {
            return setError('Passwords do not match ❌')
        }

        // Check password length
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters ❌')
        }

        setLoading(true)

        const result = await register(
            formData.full_name,
            formData.email,
            formData.password,
            formData.role
        )

        if (result.success) {
            setSuccess('Account created successfully! Redirecting to login...')
            setTimeout(() => navigate('/login'), 2000)
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    return (
        <div className="register-wrapper">

            {/* Glow Effects */}
            <div className="register-glow-1" />
            <div className="register-glow-2" />
            <div className="register-glow-3" />

            {/* Card */}
            <div className="register-card">

                {/* Header */}
                <div className="register-header">
                    <div className="register-icon">🏥</div>
                    <h1 className="register-title">Create Account</h1>
                    <p className="register-subtitle">Join the Clinic System today</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="register-error">
                        ❌ {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="register-success">
                        ✅ {success}
                    </div>
                )}

                {/* Form */}
                <form className="register-form" onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <div className="form-group">
                        <label className="form-label">👤 FULL NAME</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label">📧 EMAIL ADDRESS</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Role */}
                    <div className="form-group">
                        <label className="form-label">🎭 ROLE</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-input form-select"
                        >
                            <option value="patient">🧑‍⚕️ Patient</option>
                            <option value="doctor">👨‍⚕️ Doctor</option>
                            <option value="admin">👑 Admin</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label className="form-label">🔒 PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="form-input password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label className="form-label">🔐 CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                            className="form-input confirm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="register-btn"
                    >
                        {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
                    </button>

                </form>

                {/* Divider */}
                <div className="register-divider">
                    <div className="register-divider-line" />
                    <span className="register-divider-text">or</span>
                    <div className="register-divider-line" />
                </div>

                {/* Login Link */}
                <p className="register-login">
                    Already have an account?{' '}
                    <Link to="/login">Login here</Link>
                </p>

                {/* Footer */}
                <p className="register-footer">
                    🔐 Secure Registration — Clinic Management System
                </p>

            </div>
        </div>
    )
}

export default Register