const sequelize = require('../utils/db')
const {Model, DataTypes} = require('sequelize')

class Role extends Model {
}

Role.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Role'
})

module.exports = Role