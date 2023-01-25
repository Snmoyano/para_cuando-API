'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkInsert('publications_types' , [
        {
          id: uuid.v4() ,
          name: 'event' ,
          description: '' ,
          created_at: new Date() ,
          updated_at: new Date()
        } ,
        {
          id: uuid.v4() ,
          name: 'concert' ,
          description: '' ,
          created_at: new Date() ,
          updated_at: new Date()
        } ,
        {
          id: uuid.v4() ,
          name: 'tournament' ,
          description: '' ,
          created_at: new Date() ,
          updated_at: new Date()
        } ,
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
      await queryInterface.bulkDelete('publications_types' , {
        name: {
          [Op.or] : ['event' , 'concert' , 'tournament']
        }
      } , {transaction})

      await transaction.commit()
    } catch(error) {
      await transaction.rollback()
      throw error
    }
  }
}
