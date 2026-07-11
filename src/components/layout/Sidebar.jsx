import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

const Sidebar = ({ role }) => {
    const { logout, user } = useAuth()
    const navigate         = useNavigate()

    // ── Admin Menu ──────────────────────────────────────────
    const adminMenus = [
        { path: '/admin',              icon: '📊', label: 'Dashboard'    },
        { path: '/admin/doctors',      icon: '👨‍⚕️', label: 'Doctors'      },
        { path: '/admin/patients',     icon: '🧑‍⚕️', label: 'Patients'     },
        { path: '/admin/appointments', icon: '📅', label: 'Appointments' },
        { path: '/admin/departments',  icon: '🏥', label: 'Departments'  },
        { path: '/admin/schedules',    icon: '🕐', label: 'Schedules'    },
        { path: '/admin/settings',     icon: '⚙️', label: 'Settings'     },
    ]

    // ── Doctor Menu ─────────────────────────────────────────
    const doctorMenus = [
        { path: '/doctor',              icon: '📊', label: 'Dashboard'    },
        { path: '/doctor/appointments', icon: '📅', label: 'Appointments' },
        { path: '/doctor/patients',     icon: '🧑‍⚕️', label: 'My Patients'  },
        { path: '/doctor/schedule',     icon: '🕐', label: 'My Schedule'  },
        { path: '/doctor/profile',      icon: '👤', label: 'My Profile'   },
    ]

    // ── Patient Menu ────────────────────────────────────────
    const patientMenus = [
        { path: '/patient',              icon: '📊', label: 'Dashboard'    },
        { path: '/patient/find-doctor',  icon: '🔍', label: 'Find Doctor'  },
        { path: '/patient/appointments', icon: '📅', label: 'Appointments' },
        { path: '/patient/profile',      icon: '👤', label: 'My Profile'   },
    ]

    const menus =
        role === 'admin'   ? adminMenus   :
        role === 'doctor'  ? doctorMenus  :
        patientMenus

    return (
        <div className="sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">🏥</div>
                <div>
                    <h2 className="sidebar-logo-title">Clinic</h2>
                    <p className="sidebar-logo-sub">Management System</p>
                </div>
            </div>

            {/* User Info */}
            <div className="sidebar-user">
                <div className="sidebar-user-avatar">
                    {user?.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="sidebar-user-info">
                    <p className="sidebar-user-name">{user?.full_name}</p>
                    <span className={`sidebar-user-role ${role}`}>
                        {role}
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        end={menu.path === '/admin' ||
                             menu.path === '/doctor' ||
                             menu.path === '/patient'}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-link-icon">{menu.icon}</span>
                        <span className="sidebar-link-label">{menu.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="sidebar-footer">
                <button
                    className="sidebar-logout"
                    onClick={logout}
                >
                    🚪 Logout
                </button>
            </div>

        </div>
    )
}

export default Sidebar