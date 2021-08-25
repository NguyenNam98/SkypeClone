const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messages.controller')

router.post('/sendMessage', messageController.sendMessage)
router.get('/getMessageOfGroup', messageController.getMessageOfGroup)
router.get('/getMessage', messageController.getMessage)
router.get('/dataRoomChat/:idRoom', messageController.dataRoomChat)

module.exports = router