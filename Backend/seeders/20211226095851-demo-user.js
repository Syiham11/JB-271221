'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      
      return queryInterface.bulkInsert('Users', [{
        name: 'Syiham',
        email: 'ihammusoffa@gmail.com',
        password: '$2b$10$m.TPHs88PsKeufkWxNUumuxNhiC/pUeDDwqN1t6usud3.P73O3u6S', //123123
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};
