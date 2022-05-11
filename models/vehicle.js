'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Vehicle extends Model {
        static associate(models) {
            Vehicle.belongsTo(models.User, {
                foreignKey: 'owner_id',
                as: 'Owner',
            })
            Vehicle.belongsTo(models.VehicleType, { foreignKey: 'type_id' })
            Vehicle.hasMany(models.ParkingHistory, { foreignKey: 'vehicle_id' })
            Vehicle.belongsTo(models.VerifyState, {
                foreignKey: 'verify_state_id',
            })
        }
    }
    Vehicle.init(
        {
            license_plate: DataTypes.STRING,
            avatar: DataTypes.STRING,
            cavet_back: DataTypes.STRING,
            cavet_front: DataTypes.STRING,
            type_id: DataTypes.INTEGER,
            brand: DataTypes.STRING,
            color: DataTypes.STRING,
            detail: DataTypes.TEXT,
            owner_id: DataTypes.INTEGER,
            verify_state_id: DataTypes.INTEGER,
            deletedAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('deletedAt')) {
                        return toLocaleString(this.getDataValue('deletedAt'))
                    }
                    return null
                },
            },
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
            modelName: 'Vehicle',
        },
    )
    return Vehicle
}
