'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Package extends Model {
        static associate(models) {
            Package.belongsTo(models.ParkingLot, {
                foreignKey: 'parking_lot_id',
            })
            Package.belongsTo(models.PackageType, { foreignKey: 'type_id' })
            Package.belongsTo(models.VehicleType, {
                foreignKey: 'vehicle_type_id',
            })
            Package.hasMany(models.UserPackage, { foreignKey: 'package_id' })
        }
    }
    Package.init(
        {
            parking_lot_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            type_id: DataTypes.INTEGER,
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
            modelName: 'Package',
        },
    )
    return Package
}
