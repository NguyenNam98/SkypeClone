const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groups.controller')

router.post('/createGroup/:idUser',groupController.createGroup)
router.post('/addMember/', groupController.addMember)
router.get('/listGroups', groupController.getListGroup)
router.get('/dataOneGroup/:idGroup', groupController.dataOneGroup)
router.post('/addListMember/:idGroup', groupController.addListMember)

module.exports = router