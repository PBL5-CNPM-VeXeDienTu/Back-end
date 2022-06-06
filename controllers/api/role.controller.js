const { getListRoles } = require('../CRUD/role')

async function index(request, response) {
    try {
        const queryResult = await getListRoles()
        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    index: index,
}
