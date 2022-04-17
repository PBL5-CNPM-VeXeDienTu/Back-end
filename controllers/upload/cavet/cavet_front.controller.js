const path = require('path')

const { getVehicleById, updateVehicleById } = require('../../CRUD/vehicle')

const ADMIN_ROLE = 2

async function uploadSingle(request, respond) {
    try {
        if (request.file) {
            const vehicleId = request.params.id

            // Check if vehicle exists
            const dbVehicle = await getVehicleById(vehicleId)
            if (dbVehicle) {
                // Check if user is admin or not
                const userRole = request.userData.role
                const userId = request.userData.userId
                if (userRole != ADMIN_ROLE) {
                    // Check if user own vehicle
                    if (userId != dbVehicle.owner_id) {
                        return respond.status(400).json({
                            message: 'User is not the owner of this vehicle!',
                        })
                    }
                }

                // Update vehicle's cavet image (front) in database
                const extName = path.extname(request.file.originalname)
                const imageUrl = `public/images/cavet/front/${vehicleId}${extName}`
                const updateVehicle = {
                    cavet_image_front: imageUrl,
                }
                updateVehicleById(updateVehicle, dbVehicle.id).then(() => {
                    return respond.status(200).json({
                        message:
                            "Upload vehicle's cavet image (front) successfully!",
                        url: imageUrl,
                    })
                })
            } else {
                return respond.status(404).json({
                    message: 'Vehicle not found!',
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