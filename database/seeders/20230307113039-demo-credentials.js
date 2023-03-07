'use strict';
const generateHashedPassword = require('../../src/utils/generateHashedPasswords.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [{
      username: 'demo-user1',
      password: await generateHashedPassword('demo-user1'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-user2',
      password: await generateHashedPassword('demo-user2'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Credentials', null, {});
  }
};
