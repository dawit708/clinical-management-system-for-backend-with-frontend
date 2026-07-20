import { Routes, Route, Navigate } from 'react-router-dom'

// ── Auth Pages ──────────────────────────────────────────────
import Login    from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/public/Home'
 import About from './pages/public/About'
import Service from './pages/public/Service'
import Contact from './pages/public/Contact'

// ── Protected Route ─────────────────────────────────────────
import ProtectedRoute from './components/layout/ProtectedRoute'

// ── Admin Pages ─────────────────────────────────────────────
import AdminHome        from './pages/admin/AdminHome'
import ManageDoctors    from './pages/admin/ManageDoctors'
import ManagePatients   from './pages/admin/ManagePatients'
import ManageAppointments from './pages/admin/ManageAppointments'
import Departments      from './pages/admin/Departments'
import Schedules        from './pages/admin/Schedules'
import Settings         from './pages/admin/Settings'

// ── Doctor Pages ────────────────────────────────────────────
import DoctorHome        from './pages/doctor/DoctorHome'
import DoctorAppointments from './pages/doctor/MyAppointments'
import DoctorPatients    from './pages/doctor/PatientDetail'
import DoctorSchedule    from './pages/doctor/MySchedule'
import DoctorProfile     from './pages/doctor/DoctorProfile'

// // ── Patient Pages ────────────────────────────────────────────
 import PatientHome        from './pages/patient/PatientHome'
import FindDoctor         from './pages/patient/FindDoctor'
 import BookAppointment    from './pages/patient/BookAppointment'
 import PatientAppointments from './pages/patient/MyAppointments'
 import PatientProfile     from './pages/patient/PatientProfile'

const App = () => {
  return (
    <Routes>

      {/* ── Default Redirect ─────────────────────────────── */}
      {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
      <Route path="/" element={<Home />} />
 <Route path="/About" element={<About />} /> 
<Route path="/Service" element={<Service />} />
<Route path="/Contact" element={<Contact />} />
      {/* ── Public Routes ────────────────────────────────── */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Admin Routes ─────────────────────────────────── */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminHome />
        </ProtectedRoute>
      } />
      <Route path="/admin/doctors" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageDoctors />
        </ProtectedRoute>
      } />
      <Route path="/admin/patients" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManagePatients />
        </ProtectedRoute>
      } />
      <Route path="/admin/appointments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageAppointments />
        </ProtectedRoute>
      } />
      <Route path="/admin/departments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Departments />
        </ProtectedRoute>
      } />
      <Route path="/admin/schedules" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Schedules />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Settings />
        </ProtectedRoute>
      } />

      ── Doctor Routes ───────────────────────────────────
       <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorHome />
        </ProtectedRoute>
      } /> 
       <Route path="/doctor/appointments" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorAppointments />
        </ProtectedRoute>
      } /> 
       <Route path="/doctor/patients" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorPatients />
        </ProtectedRoute>
      } /> 
       <Route path="/doctor/schedule" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorSchedule />
        </ProtectedRoute>
      } /> 
       <Route path="/doctor/profile" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorProfile />
        </ProtectedRoute>
      } /> 

      ── Patient Routes ──────────────────────────────────
        <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientHome />
        </ProtectedRoute>
      } /> 
       <Route path="/patient/find-doctor" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <FindDoctor />
        </ProtectedRoute>
      } />
       <Route path="/patient/book-appointment" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <BookAppointment />
        </ProtectedRoute>
      } />
       <Route path="/patient/appointments" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientAppointments />
        </ProtectedRoute>
      } /> 
      <Route path="/patient/profile" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientProfile />
        </ProtectedRoute>
      } /> 

      {/* ── 404 Page ──────────────────────────────────────── */}
      <Route path="*" element={
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h1 style={{ color: '#ffffff', fontSize: '80px', margin: 0 }}>404</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
            Page not found
          </p>
          <a href="/login" style={{
            color: '#3b82f6',
            fontSize: '16px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            ← Back to Login
          </a>
        </div>
      } />

    </Routes>
  )
}

export default App