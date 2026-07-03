const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        // 1. Check if user role is allowed
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied ❌ — ${req.user.role} is not allowed` 
            })
        }
        // 2. Role is allowed — move to next function
        next()
    }
}

module.exports = roleMiddleware