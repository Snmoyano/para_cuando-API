const express = require('express')
const router = express.Router()

const {
  getStates,
  addState,
  getState,
  updateState,
  removeState,
} = require('../controllers/state.controller')




router.get('/states', getStates)

router.post('/', addState)
router.get('/:id', getState)
router.put('/:id', updateState)
router.delete('/:id', removeState)

module.exports = router
