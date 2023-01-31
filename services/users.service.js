const uuid = require('uuid')

const models = require('../database/models')
const { Op } = require('sequelize')
const classError = require('../utils/custom-error')
const CustomError = new classError()
const { hashPassword } = require('../utils/crypto')

const rolesServices = require('../services/roles.service')
const rolesSerivce = new rolesServices()

class UsersService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: ['updated_at', 'created_at'],
      },
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll(options)
    return users
  }

  async createUser({ first_name, last_name, email, username, password , country_id }) {
    const transaction = await models.sequelize.transaction()
    const publicRole = await rolesSerivce.findRoleByName('public')

    try {
      let newUser = await models.Users.create(
        {
          id: uuid.v4() ,
          first_name,
          last_name,
          email,
          username,
          password: hashPassword(password),
        } ,
        { transaction }
      )
      let newProfile = await models.Profiles.create({
        id: uuid.v4() ,
        user_id: newUser.id ,
        role_id: publicRole.id ,
        country_id
      } , {transaction})

      await transaction.commit()
      return {newUser , newProfile}
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    return await models.Users.findOne({
      where: {
        id
      } ,
      attributes: {
        exclude: ['email']
      }
    })
  }

  async updateUser(id, { first_name, last_name, username }) {
    const transaction = await models.sequelize.transaction()

    try {
      let user = await models.Users.findByPk(id)

      if (user) {
        let updatedUser = await user.update(
          {
            first_name,
            last_name,
            username,
          },
          { transaction })
        await transaction.commit()
    
        return updatedUser
        
      } else {
        return null
      }

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (user) {
        await user.destroy({ transaction })
        await transaction.commit()
  
        return user
      } else {
        return null
      }

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async findUserByEmail(email) {
    return await models.Users.scope('admin').findOne({
      where: {
        email,
      },
    })
  }

  // For seeders <-----------
  async findUserByUserName(username) {
    return await models.Users.scope('admin').findOne({
      where: {
        username
      }
    })
  }

  async findUsersByLastName(last_name) {
    return await models.Users.scope('admin').findAll({
      where: {
        last_name
      }
    })
  }

  // For password recovery <------------
  async updateUserPassword(userId , {password}) {
    const transaction = await models.sequelize.transaction()

    try {
      let user = await models.Users.findByPk(userId)

      if (user) {
        let updatedUser = await user.update(
          {
            password
          },
          { transaction })
        await transaction.commit()
    
        return updatedUser
        
      } else {
        return null
      }

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = UsersService
