'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class ParkingLot extends Model {
        static associate(models) {
            ParkingLot.belongsTo(models.User, {
                foreignKey: 'owner_id',
                as: 'Owner',
            })
            ParkingLot.hasMany(models.ParkingHistory, {
                foreignKey: 'parking_lot_id',
            })
            ParkingLot.belongsTo(models.VerifyState, {
                foreignKey: 'verify_state_id',
            })
            ParkingLot.hasOne(models.ParkingPrice, {
                foreignKey: 'parking_lot_id',
            })
            ParkingLot.hasMany(models.Package, { foreignKey: 'parking_lot_id' })
            ParkingLot.hasMany(models.UserPackage, {
                foreignKey: 'parking_lot_id',
            })
        }
    }
    ParkingLot.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            avatar: DataTypes.STRING,
            time_slot: DataTypes.STRING,
            capacity: DataTypes.INTEGER,
            is_open: DataTypes.BOOLEAN,
            is_full: DataTypes.BOOLEAN,
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
            modelName: 'ParkingLot',
        },
    )
    return ParkingLot
}
