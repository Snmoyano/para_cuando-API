const usersServices = require('../services/users.service')
const userService = new usersServices()
const { comparePassword, hashPassword } = require('../utils/crypto')
const models = require('../database/models/')
const uuid = require('uuid')

const checkUsersCredentials = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email)
    const verifyPassword = comparePassword(password, user.password)
    if (verifyPassword) {
      return user
    }
    return null
  } catch (error) {
    return null
  }
}
const createRecoveryToken = async (email) => {
  try {
    const user = await userService.findUserByEmail(email)
    const data = await models.RecoveryPassword.create({
      id: uuid.v4(),
      user_id: user.id,
    })
    return data
  } catch (error) {
    return null
  }
}
const changePassword = async (tokenId, newPassword) => {
  const recoveryData = await models.RecoveryPassword.findOne({
    where: {
      id: tokenId,
      used: false,
    },
  })
  if (recoveryData) {
    await models.RecoveryPassword.update(
      { used: true },
      {
        where: {
          id: tokenId,
        },
      }
    )
    const data = await userService.updateUser(recoveryData.user_id, {
      password: hashPassword(newPassword),
    })
    return data
  } else {
    return null
  }
}
//
module.exports = {
  checkUsersCredentials,
  createRecoveryToken,
  changePassword,
}
