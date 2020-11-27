const Role = require('../models/role')

const getRoleById = async (id) => {
    let bdRole = await Role.findOne({
        where: {
            id: id
        }
    })
    return bdRole.name
}

module.exports = {
    getRoleById
}