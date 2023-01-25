'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkInsert('countries' , [
        {
          // id: uuid.v4()  ,
          id: 1 ,
          name: 'Ecuador' , // Waiting for decision
        
        } 
      ] , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('countries' , {
        name: {
          [Op.or] : ['Ecuador']
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}