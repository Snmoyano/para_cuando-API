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

<<<<<<< HEAD
router.get('/', getUsers)
router.post('/', addUser)
router.get('/:user_id', getUser)
router.get('/:user_id/votes', getUser)
router.get('/:user_id/publications', getUser)
router.put('/:user_id', updateUser)
=======
router.route('/')
  .get(passportJWT.authenticate('jwt' , {session: false}) , roleMiddleware, getUsers)
  .post(addUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
>>>>>>> 979e1d862744c108f53f56ec429133d43c675550
router.delete('/:id', removeUser)

module.exports = router
