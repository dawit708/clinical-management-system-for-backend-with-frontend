import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
    const { login } = useAuth()
    const navigate  = useNavigate()

    const [formData, setFormData] = useState({
        email:    '',
        password: ''
    })
    const [error,   setError]   = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(formData.email, formData.password)

        if (result.success) {
            if (result.role === 'admin')        navigate('/admin')
            else if (result.role === 'doctor')  navigate('/doctor')
            else if (result.role === 'patient') navigate('/patient')
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    return (
        <div className="login-wrapper">

            {/* Glow Effects */}
            <div className="login-glow-1" />
            <div className="login-glow-2" />

            {/* Card */}
            <div className="login-card">

                {/* Header */}
                <div className="login-header">
                    <div className="login-icon">🏥</div>
                    <h1 className="login-title">Clinic System</h1>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="login-error">
                        ❌ {error}
                    </div>
                )}

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit}>

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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="login-btn"
                    >
                        {loading ? '⏳ Logging in...' : ' Login'}
                    </button>

                </form>

                {/* Divider */}
                <div className="login-divider">
                    <div className="login-divider-line" />
                    <span className="login-divider-text">or</span>
                    <div className="login-divider-line" />
                </div>

                {/* Register Link */}
                <p className="login-register">
                    Don't have an account?{' '}
                    <Link to="/register">Register here</Link>
                </p>

                {/* Footer */}
                <p className="login-footer">
                    🔐 Secure Login — Clinic Management System
                </p>

            </div>
        </div>
    )
}

export default Login