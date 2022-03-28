'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserInfo.init({
    user_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    birthday: DataTypes.DATE,
    address: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    },
    phone_number: DataTypes.STRING,
    gender: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserInfo',
  });
  return UserInfo;
};