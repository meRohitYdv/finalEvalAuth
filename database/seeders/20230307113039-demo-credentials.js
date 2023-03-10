'use strict';
const generateHashedPassword = require('../../src/utils/generateHashedPasswords.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [{
      email: 'demoUser1@gmail.com',
      password: await generateHashedPassword('demoUser1'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'demoUser2@gmail.com',
      password: await generateHashedPassword('demoUser2'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Credentials', null, {});
  }
};
