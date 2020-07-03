'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('playlogs', [{
      score: 500,
      missedcode: JSON.stringify(['code1', 'code2']),
      userid: '1',
      stageid: '1',
      // guestid: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stages', null, {});
  }
};
