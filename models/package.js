'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Package extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Package.init(
        {
            parking_lot_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            type_id: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'Package',
        },
    )
    return Package
}
