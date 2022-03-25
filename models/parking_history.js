'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParkingHistory.init({
    user_id: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    parking_lot_id: DataTypes.INTEGER,
    checkin_time: DataTypes.TIME,
    checkout_time: DataTypes.TIME,
    is_parking: DataTypes.BOOLEAN,
    memo: {
      type: DataTypes.TEXT,
      validate: {
        max: 500
      }
    },
    cost: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ParkingHistory',
  });
  return ParkingHistory;
};