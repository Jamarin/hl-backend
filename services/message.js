const Message = require('../models/message')
const UserService = require('../services/user')

const createMessage = async(message) => {
    try {
        return await Message.create({
            user_id: message.user,
            chat_area: message.chat,
            message: message.message
        })
    } catch(err) {
        console.error(err)
        return null
    }
}

const getAllMessages = async (chat) => {
    let dbMessages
    try {
        dbMessages = await Message.findAll({
            where: {
                chat_area: chat
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 20
        })
    } catch(err) {
        console.error(err)
    }
    let messageList = []
    for (let i = 0; i < dbMessages.length; i++)  {
        let message = dbMessages[i].dataValues
        let bdAuthor = await UserService.getUserById(message.user_id)
        messageList.push({
            message: message.message,
            author: {
                username: bdAuthor.username,
                house: bdAuthor.house,
                id: bdAuthor.id
            },
            id: message.id,
            hidden: message.hidden,
            highlighted: message.highlighted
        })
    }

    return {
        status: 200,
        data: messageList
    }
}

const getMessageById = async (id) => {
    return await Message.findOne({
        where: {
            id: id
        }
    })
}

const toggleHideMessage = async (id, currentStatus) => {
    await Message.update(
        {hidden: !currentStatus},
        {where: {id: id}}
        )
    let message = await getMessageById(id)
    return message.chat_area
}

const toggleHighlightMessage = async (id, currentStatus) => {
    await Message.update(
        {highlighted: !currentStatus},
        {where: {id: id}}
    )
    let message = await getMessageById(id)
    return message.chat_area
}

module.exports = {
    createMessage,
    getAllMessages,
    toggleHideMessage,
    toggleHighlightMessage
}