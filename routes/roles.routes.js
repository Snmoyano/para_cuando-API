const express = require('express')
const router = express.Router()

const {
  getRoles,
  addRol,
  getRol,
  updateRol,
  removeRol,
} = require('../controllers/roles.controller')

router.get('/', getRoles)
router.post('/', addRol)
router.get('/:id', getRol)
router.put('/:id', updateRol)
router.delete('/:id', removeRol)

module.exports = router
