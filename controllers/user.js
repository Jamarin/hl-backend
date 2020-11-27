const express = require('express')
const router = express.Router()
const UserService = require('../services/user')
const PointService = require('../services/point')

router.get('/verify', (req, res) => {
    res.status(200).send('token verified')
})

router.get('/all/owlery/:user_id', async (req, res) => {
    let response = await UserService.getAllForOwlery(req.params.user_id)
    res.status(response.status).send(response.data)
})

router.get('/:username', async (req, res) => {
    let response = await UserService.getUserByUsername(req.params.username)
    res.status(response.status).send(response.data)
})

router.get('/points/:id', async (req, res) => {
    try {
        let response = await PointService.getUserPoints(req.params.id)
        res.status(response.status).send(response.data)
    } catch (err) {
        console.error(err)
    }
})

router.post('/points/add', async (req, res) => {
    try {
        let response = await PointService.create(req.body.changePointsData)
        res.status(response.status).send(response.data)
    } catch (err) {
        console.error(err)
    }
})

module.exports = router