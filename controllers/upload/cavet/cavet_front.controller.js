const path = require('path')

const { getVehicleById, updateVehicleById } = require('../../CRUD/vehicle')

async function uploadSingle(request, response) {
    try {
        if (request.file) {
            const vehicleId = request.params.id

            // Check if vehicle exists
            const dbVehicle = await getVehicleById(vehicleId)
            if (dbVehicle) {
                // Update vehicle's cavet image (front) in database
                const extName = path.extname(request.file.originalname)
                const imageUrl = `public/images/cavet/front/${vehicleId}${extName}`
                const updateVehicle = {
                    cavet_front: imageUrl,
                }
                updateVehicleById(updateVehicle, dbVehicle.id).then(() => {
                    return response.status(200).json({
                        message:
                            "Upload vehicle's cavet image (front) successfully!",
                        url: imageUrl,
                    })
                })
            } else {
                return response.status(404).json({
                    message: 'Vehicle not found!',
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
