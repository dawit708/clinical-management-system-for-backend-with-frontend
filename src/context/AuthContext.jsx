import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

// ── Create Context ──────────────────────────────────────────
const AuthContext = createContext()

// ── Auth Provider ───────────────────────────────────────────
export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null)
    const [token, setToken]     = useState(null)
    const [loading, setLoading] = useState(true)

    // ── Load user from localStorage on startup ──────────────
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        const savedUser  = localStorage.getItem('user')

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    // ── Login ───────────────────────────────────────────────
    const login = async (email, password) => {
        try {
            const response = await authService.login({ email, password })
            const { token, user } = response.data

            // Save to localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            // Save to state
            setToken(token)
            setUser(user)

            return { success: true, role: user.role }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            }
        }
    }

    // ── Register ────────────────────────────────────────────
    const register = async (full_name, email, password, role) => {
        try {
            const response = await authService.register({
                full_name,
                email,
                password,
                role
            })
            return { success: true, message: response.data.message }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Register failed'
            }
        }
    }

    // ── Logout ──────────────────────────────────────────────
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
        window.location.href = '/login'
    }

    // ── Check Role ──────────────────────────────────────────
    const isAdmin   = () => user?.role === 'admin'
    const isDoctor  = () => user?.role === 'doctor'
    const isPatient = () => user?.role === 'patient'

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            isAdmin,
            isDoctor,
            isPatient
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// ── Custom Hook ─────────────────────────────────────────────
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return context
}

export default AuthContext