'use strict'
const uuid = require('uuid')
const { findCountryByName } = require('../../controllers/countries.controllers')
const { findRoleByName } = require('../../controllers/roles.controllers')

const UsersControllers = require('../../controllers/users.controllers')
const usersController = new UsersControllers()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    try {
      const admin = await usersController.findUsersByUserName('mems2001')
      const admin2 = await usersController.findUsersByUserName('pendingAdmin1')
      const admin3 = await usersController.findUsersByUserName('pendingAdmin2')
      const country = await findCountryByName('Ecuador')
      // console.log(country)
      const roleAdmin = await findRoleByName('admin')
      const rolePublic = await findRoleByName('public')
      const profiles = [
        {
          id: uuid.v4() ,
          user_id: admin.id ,
          role_id: roleAdmin.id ,
          phone: 999196035 ,
          country_id: country.id
        } ,
        {
          id: uuid.v4() , // Waitin for Ángel <---------
          user_id: admin2.id ,
          role_id: roleAdmin.id ,
          phone: 999196036 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Josué <---------
          user_id: admin3.id ,
          role_id: roleAdmin.id ,
          phone: 999196037 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() ,
          user_id: admin.id ,
          role_id: rolePublic.id ,
          phone: 999196035 ,
          country_id: country.id
        } ,
        {
          id: uuid.v4() , // Waitin for Ángel <---------
          user_id: admin2.id ,
          role_id: rolePublic.id ,
          phone: 999196036 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Josué <---------
          user_id: admin3.id ,
          role_id: rolePublic.id ,
          phone: 999196037 ,
          country_id: country.id 
        } 
      ]
      
      await queryInterface.bulkInsert('profiles', profiles , {transaction})

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
