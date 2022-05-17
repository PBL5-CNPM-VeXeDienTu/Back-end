'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Wallet extends Model {
        static associate(models) {
            Wallet.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'Owner',
            })
            Wallet.hasMany(models.Transaction, { foreignKey: 'wallet_id' })
        }
    }
    Wallet.init(
        {
            user_id: DataTypes.INTEGER,
            balance: DataTypes.FLOAT,
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
            modelName: 'Wallet',
        },
    )
    return Wallet
}
