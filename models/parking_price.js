'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class ParkingPrice extends Model {
        static associate(models) {
            ParkingPrice.belongsTo(models.ParkingLot, {
                foreignKey: 'parking_lot_id',
            })
            ParkingPrice.belongsTo(models.VehicleType, {
                foreignKey: 'vehicle_type_id',
            })
        }
    }
    ParkingPrice.init(
        {
            parking_lot_id: DataTypes.INTEGER,
            vehicle_type_id: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
            createdAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('createdAt')) {
                        return toLocaleString(this.getDataValue('createdAt'))
                    }
                    return null
                },
            },
            updatedAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('updatedAt')) {
                        return toLocaleString(this.getDataValue('updatedAt'))
                    }
                    return null
                },
            },
        },
        {
            sequelize,
            modelName: 'ParkingPrice',
        },
    )
    return ParkingPrice
}
