const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('hl', 'hl', 'hl', {
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
})

module.exports = sequelize