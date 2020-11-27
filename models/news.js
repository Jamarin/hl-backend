const sequelize = require('../utils/db')
const {Model, DataTypes} = require('sequelize')
const User = require('./user')

class News extends Model {}
News.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: DataTypes.STRING,
    extract: DataTypes.STRING,
    full_text: DataTypes.TEXT,
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    source_url: DataTypes.STRING,
    source_name: DataTypes.STRING,
    via_url: DataTypes.STRING,
    via_name: DataTypes.STRING,
    draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    featured: {
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
    },
}, {
    sequelize,
    modelName: 'News'
})

module.exports = News