'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class UserPackage extends Model {
        static associate(models) {
            UserPackage.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'Owner',
            })
            UserPackage.belongsTo(models.Package, { foreignKey: 'package_id' })
            UserPackage.belongsTo(models.ParkingLot, {
                foreignKey: 'parking_lot_id',
            })
            UserPackage.belongsTo(models.PackageType, { foreignKey: 'type_id' })
            UserPackage.belongsTo(models.VehicleType, {
                foreignKey: 'vehicle_type_id',
            })
        }
    }
    UserPackage.init(
        {
            user_id: DataTypes.INTEGER,
            package_id: DataTypes.INTEGER,
            parking_lot_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            type_id: DataTypes.INTEGER,
            vehicle_type_id: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
            expireAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('expireAt')) {
                        return toLocaleString(this.getDataValue('expireAt'))
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
            modelName: 'UserPackage',
        },
    )
    return UserPackage
}
