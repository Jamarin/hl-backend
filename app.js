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
const owlRoutes = require('./controllers/owl')
const stripeRoutes = require('./controllers/stripe')
const newsRoutes = require('./controllers/news')

app.use('/chat', authenticateToken, chatRoutes)
app.use('/user', authenticateToken, userRoutes)
app.use('/owlery', authenticateToken, owlRoutes)
app.use('/stripe', authenticateToken, stripeRoutes)
app.use('/news', authenticateToken, newsRoutes)
app.use('/public', require('./controllers/public'))

/** ROUTES **/

//TODO: Delete after testing phase
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** SERVER **/
let {getIO, initializeIO, addSocket, removeSocket} = require('./utils/socket-config')
const server = app.listen(process.env.PORT, async () => {
    /** INITIALIZE DB **/
    const sequelize = require('./utils/db')
    await sequelize.sync({force: true}).then(async (result) => {
        // Create roles
        const Role = require('./models/role')
        let roles = [
            {name: 'admin'},
            {name: 'moderator'},
            {name: 'user'},
            {name: 'guest'}]
        let createdRoles = await Role.bulkCreate(roles, {validate: true})
        // Create users
        const User = require('./models/user')
        let users = [
            {
                username: 'Ueki',
                name: 'Jose A.',
                birthDate: '1993-02-04',
                email: 'ueki@ueki.es',
                house: 'ravenclaw',
                password: '1234',
                role_id: createdRoles[0].id,
                patronus: 'Cat'
            },
            {
                username: 'Jose',
                name: 'Jose Antonio',
                birthDate: '1993-02-04',
                email: 'jose@jose.es',
                house: 'gryffindor',
                password: '1234',
                role_id: createdRoles[2].id,
                patronus: 'Lion'
            }
        ]
        let createdUsers = await User.bulkCreate(users, {validate: true})

        // Add some points
        const Point = require('./models/point')
        let points = [
            {
                event: 'Good task',
                value: 10,
                user_id: createdUsers[1].id,
                granted_by: createdUsers[0].id
            }
        ]
        let morePoints = [{
            event: 'Good job',
            value: 5,
            user_id: createdUsers[1].id,
            granted_by: createdUsers[0].id
        }]
        let otherPoints = [{
            event: 'Bad words',
            value: -5,
            user_id: createdUsers[1].id,
            granted_by: createdUsers[0].id
        }]
        let createdPoints = await Point.bulkCreate(points, {validate: true})
        await sleep(1000)
        let moreCPoints = await Point.bulkCreate(morePoints, {validate: true})
        await sleep(1000)
        let moreCreatedPoints = await Point.bulkCreate(otherPoints, {validate: true})

        const News = require('./models/news')
        let news = [
            {
                title: 'We are open!',
                extract: 'Virtual Hogwarts starts today!',
                full_text: `<p>Impedimenta rictusempra mortis evanesco impedimenta petrificus densaugeo. Quietus fidelius lumos engorgio exume legilimens felix orchideous protego. Legilimens confundus alohomora lacarnum reparo finite. Impedimenta vipera engorgio concealment engorgio. Locomotor imperio rictusempra totalus elixir petrificus petrificus.</p>
                    <p>Tarantallegra tergeo nox sectumsempra rictusempra lumos babbling. Alohomora imperio peskipiksi incarcerous sonorus vipera lacarnum disapparate ennervate protego protean. Legilimens rictusempra funnunculus petrificus deletrius rictusempra portus. Vow felicis leviosa evanesco funnunculus mobilicorpus inflamarae pesternomi. Tarantallegra felicis mobilicorpus felix tarantallegra patronum lumos incarcerous funnunculus reducio imperio.</p>`,
                user_id: createdUsers[0].id,
                draft: false,
                featured: true
            }
        ]
        let otherNews = [
            {
                title: 'We are looking for a team!',
                slug: 'we-are-looking-for-a-team',
                extract: 'Virtual Hogwarts is recruiting!',
                full_text: `<p>Anapneo evanesco concealment inflamarae wingardium elixir legilimens. Obliviate aparecium tarantallegra peskipiksi. Protego leviosa lacarnum protego evanesco impedimenta mortis momentum. Protego mortis impedimenta.</p>
                    <p>Rictusempra sonorus reducio evanesco aparecium lumos. Pesternomi portus incarcerous expecto expelliarmus deletrius. Ferula legilimens mobilicorpus funnunculus tarantallegra quietus vipera. Protego lacarnum patronum evanesca sectumsempra. Evanesca wingardium evanesco impedimenta expecto leviosa aparecium jinx aresto impedimenta point. Petrificus lumos petrificus engorgio inflamarae serpensortia immobilus funnunculus babbling.</p>`,
                user_id: createdUsers[0].id,
                draft: false,
                featured: false
            }
        ]

        let createdNews = await News.bulkCreate(news, {validate: true})
        await sleep(2000)
        let moreCreatedNews = await News.bulkCreate(otherNews, {validate: true})

    }).catch((err) => console.error(err))
    /** INITIALIZE DB **/
    console.info(`Server listening at http://127.0.0.1:${process.env.PORT}`)
})
/** SERVER **/

/** SOCKET.IO **/
initializeIO(server)
getIO().on('connection', function (socket) {
    addSocket(socket)
})
/** SOCKET.IO **/