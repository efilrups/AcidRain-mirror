'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stages', [{
      stagename: 'test',
      contents: JSON.stringify(['code1', 'code2', 'code3', 'code4', 'code5', 'code6']),
      createdby: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stages', null, {});
  }
};
