'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guests.hasMany(models.playlogs)
    }
  };
  guests.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  }, {
    // Other model options go here
    sequelize,  // We need to pass the connection instance
    modelName: 'guests',  // We need to choose the model name
  });
  return guests;
};