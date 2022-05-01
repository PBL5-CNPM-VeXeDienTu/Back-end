const ADMIN_ROLE = 3

async function checkRoleUpload(request, respond, next) {
    try {
        const userId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            if (requestUserId != userId) {
                return respond.status(400).json({
                    message: 'Invalid role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return respond.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkRoleAdmin(request, respond, next) {
    try {
        const userId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            // If API don't have id then this API is for admin only
            if (!userId) {
                return respond.status(400).json({
                    message: 'Invalid role!',
                })
            }

            if (requestUserId != userId) {
                return respond.status(400).json({
                    message: 'Invalid role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return respond.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    checkRoleUpload: checkRoleUpload,
    checkRoleAdmin: checkRoleAdmin,
}
