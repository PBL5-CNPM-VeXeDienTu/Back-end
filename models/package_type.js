'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class PackageType extends Model {
        static associate(models) {
            PackageType.hasMany(models.Package, { foreignKey: 'type_id' })
            PackageType.hasMany(models.UserPackage, { foreignKey: 'type_id' })
        }
    }
    PackageType.init(
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
            modelName: 'PackageType',
        },
    )
    return PackageType
}
