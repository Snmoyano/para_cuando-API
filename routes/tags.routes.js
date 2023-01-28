const express = require('express')
const router = express.Router()

const {
  getTags,
  addTag,
  getTag,
  updateTag,
  removeTag,
} = require('../controllers/tags.controller')

router.get('/', getTags)
router.post('/', addTag)
router.get('/:tag_id', getTag)
router.put('/:tag_id', updateTag)
router.delete('/:tag_id', removeTag)
