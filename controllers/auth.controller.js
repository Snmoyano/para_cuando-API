const authServices = require('../services/auth.service')
const authService = new authServices()
const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET

const postLogin = (req, res) => {
  const {email , password} = req.body

  if (email && password) {
    authService.checkCredentials(email , password)
      .then(data => {
        if (data) {
          const token = jwt.sign({
            id: data.id ,
            email: data.email ,
            username: data.username 
          } , key , {expiresIn: '2h'})
          res.status(200).json({
            message: 'Right credentials' ,
            token
          })
        } else {
          res.status(401).json({
            message: 'Invalid credentials'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        })
      })
  } else {
    res.status(400).json({
      message: 'Email or password missing'
    })
  }
}

module.exports = {
  postLogin
}