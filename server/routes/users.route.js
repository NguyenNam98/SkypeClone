const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')

router.get('/info',userController.getInfo)
router.post('/create', userController.createUser)
router.get('/groupsInfoUser', userController.getGroupsInfoUser)
router.post('/auth/login', userController.login)

// router.post('/groups/create/:idUser',userController.createGroup)

module.exports = router