const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
require('./socket')(io)
const cors = require('cors')

app.set('port', process.env.PORT || 5000)
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

server.listen(app.get('port'), () => {
    console.log('Aplicacion corriendo en el puerto ' + app.get('port'))
})