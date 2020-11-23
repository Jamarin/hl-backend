const User = require('../models/user')

const getUserByEmail = async (email) => {
    let bdUser = await User.findOne({
        where: {
            email: email
        }
    })
    return {
        username: bdUser.username,
        email: bdUser.email,
        house: bdUser.house,
        id: bdUser.id,
        password: bdUser.password,
        role: bdUser.role
    }
}

const getUsernameById = async (id) => {
    let bdUser = await User.findOne({
        where: {
            id: id
        }
    })
    return bdUser.username
}

const create = async (user) => {
    return await User.create({
        username: user.username,
        email: user.email,
        house: user.house,
        password: user.password,
        role: 'user',
        active: true,
        deleted: false
    });
}

module.exports = {
    getUserByEmail,
    getUsernameById,
    create
}