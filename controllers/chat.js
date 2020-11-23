const express = require('express')
const router = express.Router()
const MessageService = require('../services/message')
const UserService = require('../services/user')
const {getIO} = require('../socket-config')

router.get('/all/:chat', async (req, res) => {
    let response = await MessageService.getAllMessages(req.params.chat)
    res.status(response.status).send(response.data)
})

router.post('/send', async (req, res) => {
    let message = await MessageService.createMessage(req.body.message)
    let sendMessage = {
        message: message.message,
        author: await UserService.getUsernameById(message.user_id),
        id: message.id,
        chat: message.chat_area
    }
    getIO().emit(`MESSAGE_${sendMessage.chat}`, sendMessage)
    res.status(200).send(sendMessage)
})

router.put('/hide', async (req, res) => {
    let chat = await MessageService.hideMessage(req.body.id)
    let response = await MessageService.getAllMessages(chat)
    getIO().emit(`MESSAGE_${chat}`, response)
    res.status(200).send(response)
})

module.exports = router