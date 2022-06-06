const path = require('path')

const {
    getUserInfoByUserId,
    updateUserInfoByUserId,
} = require('../../CRUD/user_info')

async function uploadSingle(request, response) {
    try {
        if (request.file) {
            const userId = request.params.id

            // Check if user exists
            const dbUserInfo = await getUserInfoByUserId(userId)
            if (dbUserInfo) {
                // Update user avatar in database
                const extName = path.extname(request.file.originalname)
                const imageUrl = `public/images/avatars/user/${userId}${extName}`
                const updateUser = {
                    avatar: imageUrl,
                }
                updateUserInfoByUserId(updateUser, dbUserInfo.user_id).then(
                    () => {
                        return response.status(200).json({
                            message: "Upload user's avatar successfully!",
                            url: imageUrl,
                        })
                    },
                )
            } else {
                return response.status(404).json({
                    message: 'User info not found!',
                })
            }
        } else {
            return response.status(400).json({
                message: 'Image file not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = uploadSingle
