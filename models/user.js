const sequelize = require('../utils/db')
const {Model, DataTypes} = require('sequelize')
const Role = require('./role')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    numeric_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true
    },
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    house: DataTypes.ENUM('gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff'),
    password: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    description: DataTypes.TEXT,
    patronus: DataTypes.STRING,
    role_id: {
        type: DataTypes.UUID,
        references: {
            model: Role,
            key: 'id'
        }
    },
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