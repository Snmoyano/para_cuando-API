const express = require('express')
const router = express.Router()

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')

router.get('/', getUsers)
router.post('/', addUser)
router.get('/:user_id', getUser)
router.get('/:user_id/votes', getUser)
router.get('/:user_id/publications', getUser)
router.put('/:user_id', updateUser)
router.delete('/:id', removeUser)

module.exports = router
