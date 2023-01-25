const usersServices = require('../services/users.service')
const usersService = new usersServices()
require('dotenv').config()

const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt') ,
  secretOrKey: process.env.JWT_SECRET
}

passport.use(
  new JwtStrategy(options , async(tokenDecoded , done) => {
    try {
      const user = await usersService.getUser(tokenDecoded.id)

      if (user) {
        return done(null , tokenDecoded)
      } else {
        return done(null , false)
      }
    } catch (error) {
      return done(error , false)
    }
  })
)

module.exports = passport