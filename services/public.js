const UserService = require('./user')
const {generateAccessToken} = require("../middlewares/jwt");
const RoleService = require('./role')

const login = async (user) => {
    let bdUser = await UserService.getUserByEmail(user.email)
    if(bdUser.password === user.password) {
        return {
            status: 200,
            data: {
                ...bdUser,
                role: await RoleService.getRoleById(bdUser.role_id),
                token: generateAccessToken(bdUser)
            }
        }
    } else {
        return {
            status: 401,
            data: {}
        }
    }
}

const register = async (user) => {
    let createdUser = await UserService.create(user)
    return {
        status: 200,
        data: createdUser
    }
}

module.exports = {
    login,
    register
}