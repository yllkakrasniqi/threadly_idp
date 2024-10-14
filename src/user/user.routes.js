const express = require('express')
const { getProfile, signup, login, logout, verifyToken } = require('./user.controllers')

const router = express.Router()

router.get('/profile', getProfile)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/verify', verifyToken)

module.exports = router