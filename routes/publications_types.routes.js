const express = require('express')
const router = express.Router()

const {
  getPublicationsTypes,
  addPublicationType,
  getPublicationType,
  updatePublicationType,
  removePublicationType,
} = require('../controllers/publications_types.controller')

router.get('/', getPublicationsTypes)
router.post('/', addPublicationType)
router.get('/:id', getPublicationType)
router.put('/:id', updatePublicationType)
router.delete('/:id', removePublicationType)

module.exports = router
