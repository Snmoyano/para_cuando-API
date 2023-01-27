const express = require('express')
const router = express.Router()

const passportJWT = require('../middlewares/auth.middleware')

const {
  getPublications,
  addPublication,
  getPublication,
  // updatePublication,
  removePublication,
} = require('../controllers/publications.controller')

const { addVote } = require('../controllers/votes.controller')

router.route('/')
  .get(getPublications)
  .post(passportJWT.authenticate('jwt' , {session:false}) , addPublication)
  
router.get('/:publication_id', getPublication)
router.post('/:publication_id/vote', addVote)
// router.put('/:id', updatePublication)
router.delete('/:publication_id', removePublication)

module.exports = router
