const express = require('express')
const router = express.Router()
const {
    getDepartments,
    getDepartment,
    addDepartment,
    editDepartment,
    removeDepartment
} = require('../controllers/department.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

// ── Public Routes ───────────────────────────────────────────
router.get('/',    getDepartments)
router.get('/:id', getDepartment)

// ── Admin Only Routes ───────────────────────────────────────
router.post('/',    authMiddleware, roleMiddleware('admin'), addDepartment)
router.put('/:id',  authMiddleware, roleMiddleware('admin'), editDepartment)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removeDepartment)

module.exports = router