const usersServices = require('./users.service')
const usersService = new usersServices()
const { comparePasswords } = require('../utils/cypto')

class authService {
  constructor () {

  }

  async checkCredentials (email , password) {
    try {
      const user =  await usersService.findUserByEmail(email)
      const verify = comparePasswords(password , user.password)
      if (verify) {
        return user
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

module.exports = authService