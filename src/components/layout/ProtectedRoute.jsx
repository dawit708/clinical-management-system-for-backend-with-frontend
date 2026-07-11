import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth()

    // ── Still loading ───────────────────────────────────────
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid rgba(255,255,255,0.1)',
                    borderTop: '4px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                    Loading...
                </p>
                <style>{`
                    @keyframes spin {
                        0%   { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    // ── Not logged in ───────────────────────────────────────
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // ── Wrong role ──────────────────────────────────────────
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === 'admin')        return <Navigate to="/admin"   replace />
        if (user.role === 'doctor')       return <Navigate to="/doctor"  replace />
        if (user.role === 'patient')      return <Navigate to="/patient" replace />
    }

    // ── Allowed ─────────────────────────────────────────────
    return children
}

export default ProtectedRoute