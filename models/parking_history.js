'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class ParkingHistory extends Model {
        static associate(models) {
            ParkingHistory.belongsTo(models.User, { foreignKey: 'user_id' })
            ParkingHistory.belongsTo(models.Vehicle, {
                foreignKey: 'vehicle_id',
            })
            ParkingHistory.belongsTo(models.ParkingLot, {
                foreignKey: 'parking_lot_id',
            })
        }
    }
    ParkingHistory.init(
        {
            user_id: DataTypes.INTEGER,
            vehicle_id: DataTypes.INTEGER,
            parking_lot_id: DataTypes.INTEGER,
            checkin_time: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('checkin_time')) {
                        return toLocaleString(this.getDataValue('checkin_time'))
                    }
                    return null
                },
            },
            checkout_time: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('checkout_time')) {
                        return toLocaleString(
                            this.getDataValue('checkout_time'),
                        )
                    }
                    return null
                },
            },
            is_parking: DataTypes.BOOLEAN,
            memo: DataTypes.STRING,
            cost: DataTypes.FLOAT,
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
            modelName: 'ParkingHistory',
        },
    )
    return ParkingHistory
}
