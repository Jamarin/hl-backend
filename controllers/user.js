const express = require('express')
const router = express.Router()

router.get('/verify', (req, res) => {
    res.status(200).send('token verified')
})

module.exports = router