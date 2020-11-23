const jwt = require('jsonwebtoken')

const jwtToken = process.env.JWTOKEN

function generateAccessToken(user) {
    return jwt.sign(user, jwtToken, {expiresIn: '3600s'})
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)
    jwt.verify(token, jwtToken, (err, user) => {
        if(err) {
            console.error(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}