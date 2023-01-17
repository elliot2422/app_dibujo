module.exports = (io) => {
    var data = []
    var user = 0
    io.on('connection', (socket)=> {
        for (let i =0; i < data.length; i++){
            io.emit('show_drawing', data[i])
        }

        user = user +1
        io.emit('user', user)
        socket.on('delete', ()=> {
            data = []
            io.emit('show_drawing', null)
        })
        socket.on('draw', (draw)=> {
            data.push(draw)
            io.emit('show_drawing', draw)
        })

        socket.on('disconnect', ()=> {
            user = user-1
            io.emit('user', user)
        })
    })
}