'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AuthKey extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    AuthKey.init(
        {
            user_id: DataTypes.INTEGER,
            key: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'AuthKey',
        },
    );
    return AuthKey;
};
