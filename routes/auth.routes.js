const router = require('express').Router()

const authControllers = require('../controllers/auth.controller')

router.post('/login' , authControllers.postLogin)

module.exports = router