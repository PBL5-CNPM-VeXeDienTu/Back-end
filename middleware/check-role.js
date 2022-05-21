const BASIC_USER_ROLE = 1
const PARKING_LOT_USER_ROLE = 2
const ADMIN_ROLE = 3

async function checkRoleBasicUser(request, response, next) {
    try {
        const requestRole = request.userData.role

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            if (requestRole != BASIC_USER_ROLE) {
                return response.status(400).json({
                    message: 'Invalid role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkRoleParkingLot(request, response, next) {
    try {
        const requestRole = request.userData.role

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            if (requestRole != PARKING_LOT_USER_ROLE) {
                return response.status(400).json({
                    message: 'Invalid role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkRoleAdmin(request, response, next) {
    try {
        const requestRole = request.userData.role

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            return response.status(400).json({
                message: 'Invalid role!',
            })
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    checkRoleBasicUser: checkRoleBasicUser,
    checkRoleParkingLot: checkRoleParkingLot,
    checkRoleAdmin: checkRoleAdmin,
}
