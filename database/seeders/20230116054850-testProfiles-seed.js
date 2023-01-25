'use strict'
const uuid = require('uuid')
const { findCountryByName } = require('../../controllers/countries.controllers')
const { findRoleByName } = require('../../controllers/roles.controllers')
const usersControllers = require('../../controllers/users.controllers')
const usersController = new usersControllers()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const rolePublic = await findRoleByName('public')
    const country = await findCountryByName('Ecuador')
    const users = await usersController.findUsersByLastName('example')
    const users_ids = []
    const profiles = []

    try {
      for (let user of users) {
        const user_id = await user.dataValues.id
        // console.log(user)
        // console.log(user_id)
        users_ids.push(user_id)
      }
      // console.log(users_ids)
  
      for (let user_id of users_ids) {
        const profile = {
          id: uuid.v4() ,
          user_id,
          role_id: rolePublic.id,
          phone: 999999999 - users_ids.indexOf(user_id),
          country_id: country.id  
        }
        profiles.push(profile)
      }

      await queryInterface.bulkInsert('profiles' , profiles , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
