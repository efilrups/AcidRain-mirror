'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlogs.belongsTo(models.users, { foreignKey: 'userid' })
      playlogs.belongsTo(models.stages, { foreignKey: 'stageid' })
      playlogs.belongsTo(models.guests, { foreignKey: 'guestid' })
    }
  };
  playlogs.init({
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    missedcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stageid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guestid: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    // Other model options go here
    sequelize,  // We need to pass the connection instance
    modelName: 'playlogs',  // We need to choose the model name
  });
  return playlogs;
};