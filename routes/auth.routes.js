const express = require('express')
const router = express.Router()

const authControllers = require('../controllers/auth.controller')

// router.get('/', getCities)
router.post('/login', authControllers.postLogin)
router.post('/recovery-password', authControllers.postRecoveryToken)
router.patch('/recovery-password/:id', authControllers.patchPassword)

// router.get('/:id', getCity)
// router.put('/:id', updateCity)
// router.delete('/:id', removeCity)

module.exports = router
