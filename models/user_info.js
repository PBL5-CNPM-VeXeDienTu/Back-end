'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class UserInfo extends Model {
        static associate(models) {
            UserInfo.belongsTo(models.User, { foreignKey: 'user_id' })
        }
    }
    UserInfo.init(
        {
            user_id: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
            birthday: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('birthday')) {
                        return toLocaleString(this.getDataValue('birthday'))
                    }
                    return null
                },
            },
            address: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
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
            modelName: 'UserInfo',
        },
    )
    return UserInfo
}
