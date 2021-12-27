'use strict';
const { getProductList } = require('../libs/externalApi')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let pageStart = 1;
    const batchMigration = async (page) => {
      let newData = await getProductList(page)
      return new Promise((resolve, reject) => {
        if (newData && newData.length > 0) {
          return queryInterface.bulkInsert('Products', newData)
          .then(() => {
            if (newData.length > 0) {
              console.log(`-- Migration Data Batch ${page} --`)
              setTimeout(() => {
                page++
                batchMigration(page)
              }, 5000)
            } else {
              console.log('--Migration Completed--')
              resolve (true)
            }
          })
        } else resolve(true)
      })
    }  
    return batchMigration(pageStart).then(result => {
      if (result) return true
      else {
        throw TypeError('Migration not complete')
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
