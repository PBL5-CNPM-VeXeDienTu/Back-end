'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, { foreignKey: 'role' })
            User.hasOne(models.UserInfo, { foreignKey: 'user_id' })
            User.hasOne(models.Wallet, { foreignKey: 'user_id' })
            User.hasOne(models.AuthKey, { foreignKey: 'user_id' })
            User.hasMany(models.Vehicle, { foreignKey: 'owner_id' })
            User.hasMany(models.ParkingLot, { foreignKey: 'owner_id' })
            User.hasMany(models.ParkingHistory, { foreignKey: 'user_id' })
            User.hasMany(models.UserPackage, { foreignKey: 'user_id' })
            User.hasMany(models.Notification, { foreignKey: 'user_id' })
            User.hasMany(models.Feedback, { foreignKey: 'user_id' })
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                },
            },
            password: DataTypes.STRING,
            role: DataTypes.TINYINT,
            is_verified: DataTypes.BOOLEAN,
            qr_key: DataTypes.STRING,
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
            modelName: 'User',
        },
    )
    return User
}
