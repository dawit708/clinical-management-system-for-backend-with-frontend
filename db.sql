-- ============================================================
--  Clinic Management System — MySQL Database Schema (MAMP)
-- ============================================================

CREATE DATABASE IF NOT EXISTS clinic_db;
USE clinic_db;

-- ============================================================
--  TABLE 1: users
-- ============================================================
CREATE TABLE users (
    id            INT             AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100)    NOT NULL,
    email         VARCHAR(100)    NOT NULL UNIQUE,
    password_hash TEXT            NOT NULL,
    role          ENUM('admin', 'doctor', 'patient') NOT NULL,
    created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  TABLE 2: departments (created before doctors — FK target)
-- ============================================================
CREATE TABLE departments (
    id          INT           AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL UNIQUE,
    description TEXT
);

-- ============================================================
--  TABLE 3: doctors
-- ============================================================
CREATE TABLE doctors (
    id            INT           AUTO_INCREMENT PRIMARY KEY,
    user_id       INT           NOT NULL UNIQUE,
    specialty     VARCHAR(100)  NOT NULL,
    department_id INT           DEFAULT NULL,
    bio           TEXT,
    available     BOOLEAN       NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_doctor_user       FOREIGN KEY (user_id)       REFERENCES users(id)       ON DELETE CASCADE,
    CONSTRAINT fk_doctor_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- ============================================================
--  TABLE 4: patients
-- ============================================================
CREATE TABLE patients (
    id            INT          AUTO_INCREMENT PRIMARY KEY,
    user_id       INT          NOT NULL UNIQUE,
    date_of_birth DATE         DEFAULT NULL,
    phone         VARCHAR(20)  DEFAULT NULL,
    gender        ENUM('Male', 'Female', 'Other') DEFAULT NULL,
    address       TEXT,
    CONSTRAINT fk_patient_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
--  TABLE 5: appointments
-- ============================================================
CREATE TABLE appointments (
    id                INT         AUTO_INCREMENT PRIMARY KEY,
    patient_id        INT         NOT NULL,
    doctor_id         INT         NOT NULL,
    appointment_date  DATE        NOT NULL,
    appointment_time  TIME        NOT NULL,
    status            ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
    notes             TEXT,
    CONSTRAINT fk_appt_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_appt_doctor  FOREIGN KEY (doctor_id)  REFERENCES doctors(id)  ON DELETE CASCADE,
    UNIQUE KEY uq_doctor_slot (doctor_id, appointment_date, appointment_time)
);

-- ============================================================
--  TABLE 6: schedules (Doctor Availability)
-- ============================================================
CREATE TABLE schedules (
    id          INT         AUTO_INCREMENT PRIMARY KEY,
    doctor_id   INT         NOT NULL,
    day_of_week ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
    start_time  TIME        NOT NULL,
    end_time    TIME        NOT NULL,
    CONSTRAINT fk_schedule_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE KEY uq_doctor_day (doctor_id, day_of_week),
    CONSTRAINT chk_time_range CHECK (end_time > start_time)
);

-- ============================================================
--  INDEXES
-- ============================================================
CREATE INDEX idx_users_email             ON users(email);
CREATE INDEX idx_users_role              ON users(role);
CREATE INDEX idx_doctors_user_id         ON doctors(user_id);
CREATE INDEX idx_doctors_department_id   ON doctors(department_id);
CREATE INDEX idx_doctors_specialty       ON doctors(specialty);
CREATE INDEX idx_doctors_available       ON doctors(available);
CREATE INDEX idx_patients_user_id        ON patients(user_id);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id  ON appointments(doctor_id);
CREATE INDEX idx_appointments_date       ON appointments(appointment_date);
CREATE INDEX idx_appointments_status     ON appointments(status);
CREATE INDEX idx_schedules_doctor_id     ON schedules(doctor_id);

-- ============================================================
--  SEED DATA — Departments
-- ============================================================
INSERT INTO departments (name, description) VALUES
    ('Cardiology',       'Heart and cardiovascular system care'),
    ('Dentistry',        'Oral health and dental procedures'),
    ('Neurology',        'Brain, spinal cord, and nerve disorders'),
    ('Orthopedics',      'Bone, joint, and muscle treatments'),
    ('Pediatrics',       'Medical care for children and adolescents'),
    ('General Medicine', 'Primary care and general health consultations');

-- ============================================================
--  SEED DATA — Admin User
--  Password: Admin@1234
--  Replace password_hash with real bcrypt hash before use
-- ============================================================
INSERT INTO users (full_name, email, password_hash, role) VALUES
    ('System Admin', 'admin@gmail.com', '$2b$12$placeholderHashReplaceInProduction', 'admin');

-- ============================================================
--  HELPFUL VIEWS
-- ============================================================

-- Full appointment details
CREATE VIEW vw_appointments_full AS
SELECT
    a.id                AS appointment_id,
    a.appointment_date,
    a.appointment_time,
    a.status,
    a.notes,
    p.id                AS patient_id,
    pu.full_name        AS patient_name,
    pu.email            AS patient_email,
    p.phone             AS patient_phone,
    d.id                AS doctor_id,
    du.full_name        AS doctor_name,
    d.specialty,
    dep.name            AS department
FROM appointments  a
JOIN patients      p   ON a.patient_id    = p.id
JOIN users         pu  ON p.user_id       = pu.id
JOIN doctors       d   ON a.doctor_id     = d.id
JOIN users         du  ON d.user_id       = du.id
LEFT JOIN departments dep ON d.department_id = dep.id;

-- Today's appointments
CREATE VIEW vw_todays_appointments AS
SELECT * FROM vw_appointments_full
WHERE appointment_date = CURDATE()
ORDER BY appointment_time;

-- Doctor schedules with name
CREATE VIEW vw_doctor_schedules AS
SELECT
    s.id,
    s.day_of_week,
    s.start_time,
    s.end_time,
    d.id            AS doctor_id,
    u.full_name     AS doctor_name,
    d.specialty,
    dep.name        AS department
FROM schedules     s
JOIN doctors       d   ON s.doctor_id     = d.id
JOIN users         u   ON d.user_id       = u.id
LEFT JOIN departments dep ON d.department_id = dep.id
WHERE d.available = TRUE
ORDER BY s.day_of_week, s.start_time;