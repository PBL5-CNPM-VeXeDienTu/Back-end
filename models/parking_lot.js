'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingLot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParkingLot.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    avatar: DataTypes.STRING,
    time_slot: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    is_open: DataTypes.BOOLEAN,
    is_full: DataTypes.BOOLEAN,
    owner_id: DataTypes.INTEGER,
    verify_state_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ParkingLot',
  });
  return ParkingLot;
};