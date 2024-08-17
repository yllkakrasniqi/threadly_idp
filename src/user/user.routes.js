const express = require('express')
const { getProfile, signup, login, logout } = require('./user.controllers')

const router = express.Router()

router.get('/profile', getProfile)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router