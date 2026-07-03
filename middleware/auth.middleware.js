const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        // 1. Get token from header
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, access denied ❌' })
        }

        // 2. Extract token
        const token = authHeader.split(' ')[1]

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4. Attach user to request
        req.user = decoded

        // 5. Move to next function
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or expired ❌' })
    }
}

module.exports = authMiddleware