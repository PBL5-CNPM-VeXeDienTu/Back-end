'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerifyState.init({
    state: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    },
    note: {
      type: DataTypes.TEXT,
      validate: {
        max: 500
      }
    }
  }, {
    sequelize,
    modelName: 'VerifyState',
  });
  return VerifyState;
};

const PROCESSING = "Đang xử lý";
const VALID = "Hợp lệ";
const INVALID = "Không hợp lệ";