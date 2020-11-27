const User = require('../models/user')
const SendGrid = require('../utils/sendgrid')
const { Op } = require("sequelize")
const RoleService = require('./role')

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
        role_id: bdUser.role_id
    }
}

const getUserById = async (id) => {
    let bdUser = await User.findOne({
        where: {
            id: id
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

const create = async (user) => {
    let createdUser = await User.create({
        username: user.username,
        name: user.name,
        birthDate: user.birthDate,
        email: user.email,
        house: user.house,
        password: user.password,
        role: user.role_id,
        patronus: user.patronus,
        active: true,
        deleted: false
    });

    // try {
    //     await SendGrid.sendEmail(
    //         createdUser.email,
    //         process.env.EMAIL_FROM,
    //         'Registration',
    //         `User successfully registered with email ${createdUser.email} and username ${createdUser.username}.`,
    //         `<p>User successfully registered with email ${createdUser.email} and username ${createdUser.username}.</p>`
    //     )
    // } catch(err) {
    //     console.error(err)
    //     console.error(err.response.body.errors)
    // }

    return await dbUserToUsefulUser(createdUser)
}

const getAllForOwlery = async (user_id) => {
    let dbUsers = await User.findAll({
        where: {
            id: {
                [Op.not]: user_id
            }
        },
        order: [
            ['username', 'ASC']
        ]
    })
    if(dbUsers === undefined) {
        return {
            status: 404,
            data: []
        }
    }
    let usersList = []
    for(let i=0;i<dbUsers.length; i++) {
        let user = dbUsers[i].dataValues
        usersList.push({
            id: user.id,
            username: user.username
        })
    }
    return {
        status: 200,
        data: usersList
    }
}

const getUserByUsername = async (username) => {
    let dbUser = await User.findOne({
        where: {
            username: username
        }
    })
    return {
        status: 200,
        data: await dbUserToUsefulUser(dbUser)
    }
}

const dbUserToUsefulUser = async (dbUser, withPassword = false) => {
    let usefulUser = {
        username: dbUser.username,
        name: dbUser.name,
        email: dbUser.email,
        house: dbUser.house,
        id: dbUser.id,
        role: await RoleService.getRoleById(dbUser.role_id),
        role_id: dbUser.role_id,
        birthDate: dbUser.birthDate,
        patronus: dbUser.patronus,
        createdAt: dbUser.createdAt,
        active: dbUser.active
    }

    if(withPassword) {
        usefulUser.password = dbUser.password
    }

    return usefulUser
}

module.exports = {
    getUserByEmail,
    getUserById,
    getUserByUsername,
    create,
    getAllForOwlery
}