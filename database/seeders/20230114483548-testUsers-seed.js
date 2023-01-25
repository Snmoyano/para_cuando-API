'use strict'
const uuid = require('uuid')
const { hashPassword } = require('../../utils/cypto')
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const usersSeeds = []

    try {
      for (let i=1; i<21 ; i++) {
        const newSeed = {
          // id: uuid.v4() ,
          id: i + 3 ,
          first_name: `${i} name` ,
          last_name: 'example' ,
          email: `${i}@example.com` ,
          username: `${i}Example` ,
          password: hashPassword(`${i}Example`),
          // email_verified: false
        }
        usersSeeds.push(newSeed)
      }

      await queryInterface.bulkInsert('users' , usersSeeds , {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const userNames = []

    try {
      for (let i=1; i<21 ; i++) {
        const user_name = `${i}Example` 
        userNames.push(user_name)
      }

      await queryInterface.bulkDelete('users' , {
        user_name: {
          [Op.or] : userNames
        }
      }, {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}