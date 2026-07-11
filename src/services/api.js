import axios from 'axios'

// ── Base Axios Instance ─────────────────────────────────────
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// ── Auto attach token to every request ─────────────────────
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// ── Auto handle token expiry ────────────────────────────────
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// ── Auth Services ───────────────────────────────────────────
export const authService = {
    register: (data) => API.post('/auth/register', data),
    login:    (data) => API.post('/auth/login', data),
    getMe:    ()     => API.get('/auth/me')
}

// ── Department Services ─────────────────────────────────────
export const departmentService = {
    getAll:    ()       => API.get('/departments'),
    getOne:    (id)     => API.get(`/departments/${id}`),
    create:    (data)   => API.post('/departments', data),
    update:    (id, data) => API.put(`/departments/${id}`, data),
    delete:    (id)     => API.delete(`/departments/${id}`)
}

// ── Doctor Services ─────────────────────────────────────────
export const doctorService = {
    getAll:    ()         => API.get('/doctors'),
    getOne:    (id)       => API.get(`/doctors/${id}`),
    create:    (data)     => API.post('/doctors', data),
    update:    (id, data) => API.put(`/doctors/${id}`, data),
    delete:    (id)       => API.delete(`/doctors/${id}`)
}

// ── Patient Services ────────────────────────────────────────
export const patientService = {
    getAll:     ()         => API.get('/patients'),
    getOne:     (id)       => API.get(`/patients/${id}`),
    getMe:      ()         => API.get('/patients/me'),
    create:     (data)     => API.post('/patients', data),
    update:     (id, data) => API.put(`/patients/${id}`, data),
    delete:     (id)       => API.delete(`/patients/${id}`)
}

// ── Appointment Services ────────────────────────────────────
export const appointmentService = {
    getAll:           ()         => API.get('/appointments'),
    getOne:           (id)       => API.get(`/appointments/${id}`),
    book:             (data)     => API.post('/appointments/book', data),
    getMyPatient:     ()         => API.get('/appointments/my-appointments'),
    getMyDoctor:      ()         => API.get('/appointments/doctor-appointments'),
    changeStatus:     (id, data) => API.patch(`/appointments/${id}/status`, data),
    update:           (id, data) => API.put(`/appointments/${id}`, data),
    delete:           (id)       => API.delete(`/appointments/${id}`)
}

// ── Schedule Services ───────────────────────────────────────
export const scheduleService = {
    getAll:          ()         => API.get('/schedules'),
    getMySchedule:   ()         => API.get('/schedules/my-schedule'),
    getByDoctor:     (id)       => API.get(`/schedules/doctor/${id}`),
    create:          (data)     => API.post('/schedules', data),
    update:          (id, data) => API.put(`/schedules/${id}`, data),
    delete:          (id)       => API.delete(`/schedules/${id}`)
}

export default API