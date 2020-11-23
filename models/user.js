const sequelize = require('../db')
const {Model, DataTypes} = require('sequelize')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    house: DataTypes.ENUM('gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff'),
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'moderator', 'user'),
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'User'
})

module.exports = User