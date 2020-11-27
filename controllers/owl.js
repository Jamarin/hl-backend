const express = require('express')
const router = express.Router()
const OwlService = require('../services/owl')
const UserService = require('../services/user')
const {getIO} = require('../utils/socket-config')

router.get('/all/sender/:sender_id', async (req, res) => {
    let response = await OwlService.getAllOwlBySender(req.params.sender_id)
    res.status(response.status).send(response.data)
})

router.get('/all/receptor/:receptor_id', async (req, res) => {
    let response = await OwlService.getAllOwlByReceptor(req.params.receptor_id)
    res.status(response.status).send(response.data)
})

router.put('/mark-read', async (req, res) => {
    let response = await OwlService.markAsRead(req.body.id)
    getIO().emit(`OWL_UPDATED_${response.data.receptor}`, response.data)
    res.status(response.status).send(response.data)
})

router.post('/send', async (req, res) => {
    let owl = await OwlService.createOwl(req.body.owl)
    let dbSender = await UserService.getUserById(owl.sender_id)
    let dbReceptor = await UserService.getUserById(owl.receptor_id)
    let sentOwl = {
        id: owl.id,
        title: owl.title,
        message: owl.message,
        receptor: dbReceptor.username,
        receptor_id: dbReceptor.id,
        sender: dbSender.username,
        sender_id: dbSender.id,
        read: owl.read,
        favorite: owl.favorite,
        createdAt: owl.createdAt
    }
    getIO().emit(`OWL_SENT_${dbSender.username}`, sentOwl)
    getIO().emit(`OWL_RECEIVED_${dbReceptor.username}`, sentOwl)
    res.status(200).send(sentOwl)
})

router.put('/toggle-favorite', async (req, res) => {
    let owl = await OwlService.toggleFavoriteOwl(req.body.id, req.body.currentStatus)
    let response = await OwlService.getAllOwlByReceptor(req.body.receptor_id)
    res.status(200).send(response.data)
})

module.exports = router