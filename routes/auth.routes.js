const express = require('express')
const router = express.Router()

const authServices = require('../controllers/auth.controller')

// router.get('/', getCities)
router.post('/login', authServices.login)

// router.get('/:id', getCity)
// router.put('/:id', updateCity)
// router.delete('/:id', removeCity)

module.exports = router
