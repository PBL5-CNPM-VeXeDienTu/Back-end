const path = require('path')

const {
    getParkingLotById,
    updateParkingLotById,
} = require('../../CRUD/parking_lot')

const ADMIN_ROLE = 2

async function uploadSingle(request, respond) {
    try {
        if (request.file) {
            const parkingLotId = request.params.id

            // Check if vehicle exists
            const dbParkingLot = await getParkingLotById(parkingLotId)
            if (dbParkingLot) {
                // Check if user is admin or not
                const userRole = request.userData.role
                const userId = request.userData.userId
                if (userRole != ADMIN_ROLE) {
                    if (userId != dbParkingLot.owner_id) {
                        // Check if user own parking-lot
                        return respond.status(400).json({
                            message: 'User is not the owner of this parking lot!',
                        })
                    }
                }

                // Update parking lot avatar in database
                const extName = path.extname(request.file.originalname)
                const imageUrl = `public/images/avatars/parking-lot/${parkingLotId}${extName}`
                const updateParkingLot = {
                    avatar: imageUrl,
                }
                updateParkingLotById(updateParkingLot, dbParkingLot.id).then(
                    () => {
                        return respond.status(200).json({
                            message:
                                "Upload parking lot's avatar successfully!",
                            url: imageUrl,
                        })
                    },
                )
            } else {
                return respond.status(404).json({
                    message: 'Parking lot not found!',
                })
            }
        } else {
            return respond.status(400).json({
                message: 'Image file not found!',
            })
        }
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = uploadSingle
