'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class VerifyState extends Model {
        static associate(models) {
            VerifyState.hasOne(models.Vehicle, {
                foreignKey: 'verify_state_id',
            })
            VerifyState.hasOne(models.ParkingLot, {
                foreignKey: 'verify_state_id',
            })
        }
    }
    VerifyState.init(
        {
            state: {
                type: DataTypes.ENUM,
                values: [
                    'Đang chờ xử lý',
                    'Đã được kiểm duyệt',
                    'Không đạt yêu cầu',
                ],
            },
            note: DataTypes.STRING,
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
            modelName: 'VerifyState',
        },
    )
    return VerifyState
}

const PROCESSING = 'Đang xử lý'
const VALID = 'Hợp lệ'
const INVALID = 'Không hợp lệ'
