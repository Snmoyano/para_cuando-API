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

router.route('/:publication_id')
  .get(getPublication)
  .delete(passportJWT.authenticate('jwt' , {session:false}) , removePublication)

router.post('/:publication_id/vote', passportJWT.authenticate('jwt' , {session:false}) , addVote)

module.exports = router
