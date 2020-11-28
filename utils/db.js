const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('hl', 'hl', 'hl', {
    host: '172.16.238.3',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
})

module.exports = sequelize