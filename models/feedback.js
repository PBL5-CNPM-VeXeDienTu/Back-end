'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        static associate(models) {
            Feedback.belongsTo(models.User, { foreignKey: 'user_id' })
            Feedback.belongsTo(models.FeedbackType, { foreignKey: 'type_id' })
            Feedback.belongsTo(models.Feature, { foreignKey: 'feature_id' })
        }
    }
    Feedback.init(
        {
            user_id: DataTypes.INTEGER,
            type_id: DataTypes.INTEGER,
            feature_id: DataTypes.INTEGER,
            content: DataTypes.STRING,
            is_processed: DataTypes.BOOLEAN,
            response: DataTypes.TEXT,
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
            modelName: 'Feedback',
        },
    )
    return Feedback
}
