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
router.get('/:id', getTag)
router.put('/:id', updateTag)
router.delete('/:id', removeTag)
