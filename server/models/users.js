'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.stages)
      users.hasMany(models.playlogs)
    }
  };
  users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    // Other model options go here
    sequelize,  // We need to pass the connection instance
    modelName: 'users',  // We need to choose the model name
    hooks: {
      beforeCreate: (data, option) => {
        var shasum = crypto.createHmac('sha512', '');
        shasum.update(data.password);
        data.password = shasum.digest('hex');
      },
      beforeFind: (data, option) => {
        if (data.where.password) {
          var shasum = crypto.createHmac('sha512', '');
          shasum.update(data.where.password);
          data.where.password = shasum.digest('hex');
        }
      }
    }
  });
  return users;
};