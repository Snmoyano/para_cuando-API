const generateJWT = require('../utils/generate-jwts')
const usersServices = require('../controllers/users.controller')
const auth = usersServices
const { comparePassword } = require('../utils/crypto')
// const userService = new usersServices()

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await auth.findUserByEmail(email)
    if (!user) {
      return res.status(400).json({
        message: 'Usuario o contraseña incorrectos',
      })
    }
    const validPassword = comparePassword(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        message: 'Usuario o contraseña incorrectos',
      })
    }
    //generar jwt
    const token = await generateJWT(user.id)
    res.json({
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Something went wrong, talk to the administrator',
    })
  }
}
module.exports = {
  login,
}
// const jwt = require('jsonwebtoken')
// const checkUsersCredentials = require('../services/auth.service')
// // const AuthService = require('../services/auth.service')
// // const checkUsersCredentials = AuthService
// const jwtSecret = require('../database/config/config').api.jwtSecret

// const postLogin = (req, res) => {
//   const { email, password } = req.body

//   if (email && password) {
//     checkUsersCredentials(email, password)
//       .then((data) => {
//         if (data) {
//           const token = jwt.sign({ id: data.id, email: data.email }, jwtSecret)

//           res.status(200).json({
//             message: 'Correct Credentials!',
//             token,
//           })
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' })
//         }
//       })
//       .catch((err) => {
//         res.status(400).json({ message: err.message })
//       })
//   } else {
//     res.status(400).json({
//       message: 'Missing Data',
//       fields: {
//         email: 'example@example.com',
//         password: 'string',
//       },
//     })
//   }
// }

// module.exports = postLogin
