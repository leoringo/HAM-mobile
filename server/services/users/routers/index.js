require('dotenv').config()
const router = require('express').Router()
const Controller = require('../controllers')


router.get('/users', Controller.getUser)
router.post('/users', Controller.createUser)
router.get('/users/:userId', Controller.getUserById)
router.delete('/users/:userId', Controller.deleteUser)

module.exports = router
