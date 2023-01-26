const express = require('express')
const router = express.Router()

const {
  getPublications,
  addPublication,
  getPublication,
  updatePublication,
  removePublication,
} = require('../controllers/publications.controller')

router.get('/', getPublications)
router.post('/', addPublication)
router.get('/:publication_id', getPublication)
router.get('/:publication_id/vote', getPublication)
// router.put('/:id', updatePublication)
router.delete('/:publication_id', removePublication)

module.exports = router
