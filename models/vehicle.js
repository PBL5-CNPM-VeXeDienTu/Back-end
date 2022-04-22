'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Vehicle extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Vehicle.init(
        {
            license_plate: DataTypes.STRING,
            avatar: DataTypes.STRING,
            cavet_back: DataTypes.STRING,
            cavet_front: DataTypes.STRING,
            type: DataTypes.STRING,
            color: DataTypes.STRING,
            detail: DataTypes.TEXT,
            owner_id: DataTypes.INTEGER,
            verify_state_id: DataTypes.INTEGER,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Vehicle',
        },
    )
    return Vehicle
}
