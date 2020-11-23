require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const {authenticateToken} = require("./middlewares/jwt");

/** CORS **/
app.use(cors({origin: '*'}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    //res.setHeader('Access-Control-Allow-Credentials', 0)
    next()
})
/** CORS **/

/** BODY PARSER **/
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/** BODY PARSER **/

/** ROUTES **/
const userRoutes = require('./controllers/user')
const chatRoutes = require('./controllers/chat')

app.use('/chat', authenticateToken, chatRoutes)
app.use('/user', authenticateToken, userRoutes)
app.use('/public', require('./controllers/public'))
/** ROUTES **/

/** SERVER **/
let { getIO, initializeIO, addSocket, removeSocket } = require('./socket-config')
const server = app.listen(process.env.PORT, async () => {
    /** INITIALIZE DB **/
    const sequelize = require('./db')
    await sequelize.sync({ force: false }).then((result) => console.log('sync')).catch((err) => console.error(err))
    /** INITIALIZE DB **/
    console.info(`Server listening at http://127.0.0.1:${process.env.PORT}`)
})
/** SERVER **/

/** SOCKET.IO **/
initializeIO(server)
getIO().on('connection', function(socket) {
    addSocket(socket)
})
/** SOCKET.IO **/