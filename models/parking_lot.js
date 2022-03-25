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
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    },
    avatar: DataTypes.STRING,
    time_slot: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    is_open: DataTypes.BOOLEAN,
    is_full: DataTypes.BOOLEAN,
    owner_id: DataTypes.INTEGER,
    verify_state: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ParkingLot',
  });
  return ParkingLot;
};