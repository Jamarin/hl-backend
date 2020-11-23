const express = require('express')
const router = express.Router()
const PublicService = require('../services/public')

router.post('/login', async (req, res) => {
    let response = await PublicService.login(req.body.user)
    res.status(response.status).send(response.data)
})

router.post('/register', async(req, res) => {
    let response = await PublicService.register(req.body.user)
    res.status(response.status).send(response.data)
})

module.exports = router