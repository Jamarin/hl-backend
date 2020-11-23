let connections = []
let io

function initializeIO(server) {
    io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:9000",
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
    //TODO: Remove parameter socket
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