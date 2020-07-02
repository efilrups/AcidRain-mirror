'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  // const stages = sequelize.define(
  //   'stages',
  //   {
  //     stagename: {
  //       type: DataTypes.STRING,
  //       allowNull: false
  //     },
  //     createdby: DataTypes.INTEGER,
  //     createdAt: {
  //       type: DataTypes.DATE,
  //       defaultValue: sequelize.literal('NOW()')
  //     },
  //     updatedAt: {
  //       type: DataTypes.DATE,
  //       defaultValue: sequelize.literal('NOW()')
  //     }
  //   },
  //   {}
  // )

  class stages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  stages.init({
    stagename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Other model options go here
    sequelize,  // We need to pass the connection instance
    modelName: 'stages',  // We need to choose the model name
  });


  return stages;
};