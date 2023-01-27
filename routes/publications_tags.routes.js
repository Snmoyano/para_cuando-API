const express = require('express')
const router = express.Router()

const {
  getPublicationsTags,
  addPublicationTag,
  getPublicationTag,
  updatePublicationTag,
  removePublicationTag,
} = require('../controllers/publications_tags.controller')

router.get('/', getPublicationsTags)
router.post('/', addPublicationTag)
router.get('/:id', getPublicationTag)
router.put('/:id', updatePublicationTag)
router.delete('/:id', removePublicationTag)
