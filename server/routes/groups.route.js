const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groups.controller')


router.post('/createGroup/:idUser',groupController.createGroup)
router.post('/addMember/', groupController.addMember)

module.exports = router