const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMe } = require('../controllers/userController')
const { protected } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protected, getMe)

module.exports = router