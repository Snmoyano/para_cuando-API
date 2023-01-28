const jwt = require('jsonwebtoken')
const authServices = require('../services/auth.service')
const mailer = require('../utils/mailer')
const config = require('../database/config/config')

const key = process.env.JWT_SECRET

const postLogin = (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    authServices
      .checkUsersCredentials(email, password)
      .then((data) => {
        if (data) {
          const token = jwt.sign(
            {
              id: data.id,
              email: data.email,
              username: data.username,
            },
            key,
            { expiresIn: '2h' }
          )
          res.status(200).json({
            message: 'Right credentials',
            token,
          })
        } else {
          res.status(401).json({
            message: 'Invalid credentials',
          })
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        })
      })
  } else {
    res.status(400).json({
      message: 'Email or password missing',
    })
  }
}
const postRecoveryToken = (req, res) => {
  const { email } = req.body
  if (email) {
    authServices.createRecoveryToken(email).then((data) => {
      if (data) {
        mailer.sendMail({
          from: '<test.academlo@gmail.com>',
          to: email,
          subject: 'Recuperación de Contraseña',
          html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>${config.api.host}/api/v1/auth/recovery-password/${data.id}</a>`,
        })
      }
      res.status(200).json({ message: 'Email sended!, Check your inbox' })
    })
  } else {
    res.status(400).json({
      message: 'Invalid Data',
      fields: { email: 'example@example.com' },
    })
  }
}

const patchPassword = (req, res) => {
  const id = req.params.id
  const { password } = req.body
  authServices
    .changePassword(id, password)
    .then((data) => {
      if (data) {
        res.status(200).json({ message: 'Password updated succesfully!' })
      } else {
        res.status(400).json({ message: 'URL expired' })
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error.message })
    })
}

module.exports = {
  postLogin,
  postRecoveryToken,
  patchPassword,
}
