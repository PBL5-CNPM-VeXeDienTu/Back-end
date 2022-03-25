'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init({
    user_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    feature_id: DataTypes.INTEGER,
    content: {
      type: DataTypes.TEXT,
      validate: {
        max: 500
      }
    },
    is_processed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};