'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PackageType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PackageType.init({
    type_name: {
      type: DataTypes.STRING,
      validate: {
        max: 100
      }
    }
  }, {
    sequelize,
    modelName: 'PackageType',
  });
  return PackageType;
};