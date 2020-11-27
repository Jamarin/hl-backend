const Owl = require('../models/owl')
const UserService = require('../services/user')

const createOwl = async (owl) => {
    try {
        return await Owl.create({
            receptor_id: owl.selectedUser.id,
            sender_id: owl.senderUser.id,
            title: owl.subject,
            message: owl.message,
            read: false,
            deleted: false,
            favorite: false
        })
    } catch (err) {
        console.error(err)
        return null
    }
}

const getOwlById = async (id) => {
    return await Owl.findOne({
        where: {
            id: id
        }
    })
}

const getAllOwlBySender = async (sender_id) => {
    let dbOwls
    try {
        dbOwls = await Owl.findAll({
            where: {
                sender_id: sender_id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
    } catch (err) {
        console.error(err)
    }

    let owlList = []
    if (dbOwls !== undefined) {
        for (let i = 0; i < dbOwls.length; i++) {
            let owl = dbOwls[i].dataValues
            let bdReceptor = await UserService.getUserById(owl.receptor_id)
            let bdSender = await UserService.getUserById(owl.sender_id)
            owlList.push({
                id: owl.id,
                title: owl.title,
                message: owl.message,
                receptor_id: bdReceptor.id,
                receptor: bdReceptor.username,
                sender_id: bdSender.id,
                sender: bdSender.username,
                read: owl.read,
                favorite: owl.favorite,
                createdAt: owl.createdAt
            })
        }
    }

    return {
        status: 200,
        data: owlList
    }
}

const getAllOwlByReceptor = async (receptor_id) => {
    let dbOwls
    try {
        dbOwls = await Owl.findAll({
            where: {
                receptor_id: receptor_id,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
    } catch (err) {
        console.error(err)
    }

    let owlList = []
    if (dbOwls !== undefined) {
        for (let i = 0; i < dbOwls.length; i++) {
            let owl = dbOwls[i].dataValues
            let bdReceptor = await UserService.getUserById(owl.receptor_id)
            let bdSender = await UserService.getUserById(owl.sender_id)
            owlList.push({
                id: owl.id,
                title: owl.title,
                message: owl.message,
                receptor_id: bdReceptor.id,
                receptor: bdReceptor.username,
                sender_id: bdSender.id,
                sender: bdSender.username,
                read: owl.read,
                favorite: owl.favorite,
                createdAt: owl.createdAt
            })
        }
    }

    return {
        status: 200,
        data: owlList
    }
}

const toggleFavoriteOwl = async (id, currentStatus) => {
    await Owl.update(
        {favorite: !currentStatus},
        {where: {id: id}}
    )
    let owl = await getOwlById(id)
    return {
        status: 200,
        data: await transformDbOwlToUsefulOwl
    }
}

const markAsRead = async (id) => {
    await Owl.update(
        {read: true},
        {where: {id: id}}
    )
    let owl = await getOwlById(id)
    return {
        status: 200,
        data: await transformDbOwlToUsefulOwl(owl)
    }
}

const transformDbOwlToUsefulOwl = async (dbOwl) => {
    let bdReceptor = await UserService.getUserById(dbOwl.receptor_id)
    let bdSender = await UserService.getUserById(dbOwl.sender_id)
    return {
        id: dbOwl.id,
        title: dbOwl.title,
        message: dbOwl.message,
        receptor_id: bdReceptor.id,
        receptor: bdReceptor.username,
        sender_id: bdSender.id,
        sender: bdSender.username,
        read: dbOwl.read,
        favorite: dbOwl.favorite,
        createdAt: dbOwl.createdAt
    }
}

module.exports = {
    createOwl,
    getAllOwlByReceptor,
    getAllOwlBySender,
    toggleFavoriteOwl,
    markAsRead
}