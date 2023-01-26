const express = require('express')
const router = express.Router()

const passportJWT = require('../middlewares/auth.middleware')
const {roleMiddleware} = require('../middlewares/role.middleware')

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')

router.route('/')
  .get(passportJWT.authenticate('jwt' , {session: false}) , roleMiddleware, getUsers)
  .post(addUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

module.exports = router
