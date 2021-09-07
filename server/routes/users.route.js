const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')

router.get('/info',userController.getInfo)
router.get('/groupsInfoUser', userController.getGroupsInfoUser)
router.get('/search/:userName', userController.searchUserByName)
router.get('/search/relatedUser/:idGroup', userController.relatedUser)
router.post('/create', userController.createUser)
router.post('/auth/login', userController.login)
router.post('/auth/refreshToken', userController.refreshToken)
router.post('/auth/checkLogin', userController.checkLogin)
router.post('/auth/verify', userController.verifyGmail)

// router.post('/groups/create/:idUser',userController.createGroup)

module.exports = router