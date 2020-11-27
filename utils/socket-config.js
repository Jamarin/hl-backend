let connections = []
let io

function initializeIO(server) {
    io = require('socket.io')(server, {
        cors: {
            origin: ["http://localhost:9000", "http://127.0.0.1:9000"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });
}

function getIO() {
    return io
}

function addSocket(socket) {
    connections.push(socket)
}

function removeSocket(socket) {
    let index = connections.indexOf(socket)
    if (index > -1) {
        connections.splice(index, 1)
    }
}

function getSockets() {
    return connections
}

module.exports = {
    getIO,
    initializeIO,
    addSocket,
    removeSocket,
    getSockets
}