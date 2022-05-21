'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class VehicleType extends Model {
        static associate(models) {
            VehicleType.hasMany(models.Vehicle, { foreignKey: 'type_id' })
            VehicleType.hasMany(models.ParkingPrice, {
                foreignKey: 'vehicle_type_id',
            })
            VehicleType.hasMany(models.Package, {
                foreignKey: 'vehicle_type_id',
            })
            VehicleType.hasMany(models.UserPackage, {
                foreignKey: 'vehicle_type_id',
            })
        }
    }
    VehicleType.init(
        {
            type_name: DataTypes.STRING,
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
            modelName: 'VehicleType',
        },
    )
    return VehicleType
}
