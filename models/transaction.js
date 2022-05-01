'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            Transaction.belongsTo(models.Wallet, { foreignKey: 'wallet_id' })
            Transaction.belongsTo(models.TransactionType, {
                foreignKey: 'type_id',
            })
        }
    }
    Transaction.init(
        {
            wallet_id: DataTypes.INTEGER,
            type_id: DataTypes.INTEGER,
            reference_id: DataTypes.INTEGER,
            amount: DataTypes.FLOAT,
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
            modelName: 'Transaction',
        },
    )
    return Transaction
}
