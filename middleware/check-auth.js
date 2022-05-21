const jwt = require('jsonwebtoken')

const { checkValidAccount } = require(process.cwd() + '/controllers/CRUD/user')

async function checkAuth(request, response, next) {
    try {
        const token = request.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        request.userData = decodedToken

        // Check if user email is valid (verified and not deleted) or not
        const result = await checkValidAccount(decodedToken.userId)
        if (!result.is_valid) {
            return response.status(400).json({
                message: result.message,
            })
        } else {
            next()
        }
    } catch (error) {
        return response.status(401).json({
            message: 'Invalid or expired token provided!',
            error: error,
        })
    }
}

module.exports = {
    checkAuth: checkAuth,
}
