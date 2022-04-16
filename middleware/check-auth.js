const jwt = require('jsonwebtoken')

function checkAuth(request, respond, next) {
    try {
        const token = request.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        request.userData = decodedToken
        next()
    } catch (error) {
        return respond.status(401).json({
            message: 'Invalid or expired token provided!',
            error: error,
        })
    }
}

module.exports = {
    checkAuth: checkAuth,
}
