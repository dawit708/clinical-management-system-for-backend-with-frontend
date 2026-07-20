import './Navbar.css'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({ title }) => {
    const { user } = useAuth()

    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">{title}</h1>
            </div>
            <div className="navbar-right">
                <div className="navbar-date">
                    📅 {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year:    'numeric',
                        month:   'long',
                        day:     'numeric'
                    })}
                </div>
                <div className="navbar-user">
                    <div className="navbar-avatar">
                        {user?.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="navbar-name">{user?.full_name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar