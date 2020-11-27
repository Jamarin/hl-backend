const express = require('express')
const router = express.Router()
const NewsService = require('../services/news')

router.get('/show/all/', async (req, res) => {
    let response = await NewsService.getAllNewsShow()
    res.status(response.status).send(response.data)
})

module.exports = router