'use strict';
const {
  Model
} = require('sequelize');
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
  Vehicle.init({
    license_plate: {
      type: DataTypes.STRING,
      validate: {
        max: 20
      }
    },
    vehicle_image: DataTypes.STRING,
    cavet_image_front: DataTypes.STRING,
    cavet_image_back: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    },
    color: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    },
    owner_id: DataTypes.INTEGER,
    verify_state: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};