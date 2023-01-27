const express = require('express')
const router = express.Router()

const passportJWT = require('../middlewares/auth.middleware')
const { roleMiddleware } = require('../middlewares/role.middleware')

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')

const { getPublications } = require('../controllers/publications.controller')

router
  .route('/')
  .get(
    passportJWT.authenticate('jwt', { session: false }),
    roleMiddleware,
    getUsers
  )
  .post(addUser)
router.post('/', addUser)
router.get('/:user_id', getUser)

   

router.get('/users', getUser)


router.get('/:user_id/votes', getVotes)
router.get('/:user_id/publications', getPublications)
router.put('/:user_id', updateUser)
router.delete('/:id', removeUser)

module.exports = router
