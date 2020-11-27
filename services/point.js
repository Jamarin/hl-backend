const Point = require('../models/point')
const UserService = require('./user')

const getUserPoints = async (id) => {
    let dbPoints = await Point.findAll({
        where: {
            user_id: id
        },
        order: [
            ['createdAt', 'ASC']
        ]
    })

    if (dbPoints === undefined) {
        return {
            status: 404,
            data: []
        }
    }

    let pointsList = []
    for (let i = 0; i < dbPoints.length; i++) {
        let point = dbPoints[i].dataValues
        pointsList.push({
            id: point.id,
            event: point.event,
            value: point.value,
            createdAt: point.createdAt
        })
    }

    return {
        status: 200,
        data: pointsList
    }
}

const create = async (point) => {
    let createdPoint = await Point.create({
        event: point.event,
        value: point.value,
        user_id: point.user,
        granted_by: point.staff
    })

    return {
        status: 200,
        data: await dbPointToUsefulPoint(createdPoint)
    }
}

const dbPointToUsefulPoint = async (dbPoint) => {
    return {
        event: dbPoint.event,
        value: dbPoint.value,
        user: await UserService.getUserById(dbPoint.user_id),
        staff: await UserService.getUserById(dbPoint.granted_by),
        createdAt: dbPoint.createdAt
    }
}

module.exports = {
    getUserPoints,
    create
}