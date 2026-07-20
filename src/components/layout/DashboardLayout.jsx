import Sidebar from './Sidebar'
import Navbar  from './Navbar'
import './DashboardLayout.css'

const DashboardLayout = ({ children, title, role }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar role={role} />
            <div className="dashboard-main">
                <Navbar title={title} />
                <div className="dashboard-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout