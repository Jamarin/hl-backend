const sequelize = require('../utils/db')
const User = require('./user')
const {Model, DataTypes} = require('sequelize')

class Owl extends Model {}
Owl.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    receptor_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    sender_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Owl'
})

module.exports = Owl