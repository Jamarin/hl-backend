const sequelize = require('../utils/db')
const {Model, DataTypes} = require('sequelize')
const User = require('./user')

class Point extends Model {}
Point.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    event: DataTypes.STRING,
    value: DataTypes.INTEGER,
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    granted_by: {
        type: DataTypes.UUID,
        references: {
            model: User,
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
    }
}, {
    sequelize,
    modelName: 'Point'
})

module.exports = Point