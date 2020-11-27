const express = require('express')
const router = express.Router()
const MessageService = require('../services/message')
const UserService = require('../services/user')
const {getIO} = require('../utils/socket-config')

router.get('/all/:chat', async (req, res) => {
    let response = await MessageService.getAllMessages(req.params.chat)
    res.status(response.status).send(response.data)
})

router.post('/send', async (req, res) => {
    let message = await MessageService.createMessage(req.body.message)
    let bdAuthor = await UserService.getUserById(message.user_id)
    let sentMessage = {
        message: message.message,
        author: {
            username: bdAuthor.username,
            house: bdAuthor.house,
            id: bdAuthor.id
        },
        id: message.id,
        chat: message.chat_area
    }
    getIO().emit(`MESSAGE_${sentMessage.chat}`, sentMessage)
    res.status(200).send(sentMessage)
})

router.put('/toggle-hide', async (req, res) => {
    let chat = await MessageService.toggleHideMessage(req.body.id, req.body.currentStatus)
    let response = await MessageService.getAllMessages(chat)
    getIO().emit(`UPDATE_${chat}`, response.data)
    res.status(200).send(response)
})

router.put('/toggle-highlight', async (req, res) => {
    let chat = await MessageService.toggleHighlightMessage(req.body.id, req.body.currentStatus)
    let response = await MessageService.getAllMessages(chat)
    getIO().emit(`UPDATE_${chat}`, response.data)
    res.status(200).send(response)
})

module.exports = router