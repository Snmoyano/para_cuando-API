const nodemailer = require('nodemailer')
const config = require('../database/config/config').api

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sergio.nicolas.moyano@gmail.com',
    pass: config.mailPass,
  },
})

module.exports = transporter
