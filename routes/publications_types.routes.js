const express = require('express')
const router = express.Router()


const {
  getPublicationsTypes,
  addPublicationType,
  getPublicationType,
  updatePublicationType,
  removePublicationType,
} = require('../controllers/publications_types.controller')



router.route('/')
  .get(getPublicationsTypes)
  .post(addPublicationType)

router.get('/:publication_type_id', getPublicationType)

router.put('/:id', updatePublicationType)
router.delete('/:id', removePublicationType)

module.exports = router
