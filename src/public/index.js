const socket = io()
var click = false
var moving_mouse = false
var x_position = 0
var y_position = 0
var previous_position = null
var color = 'red'

const user = document.getElementById('user')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight


canvas.width = width
canvas.height = height

canvas.addEventListener('mousedown', ()=>{
    click = true
})

canvas.addEventListener('mouseup', ()=>{
    click = false
})

canvas.addEventListener('mousemove', (e) => {
    x_position = e.clientX
    y_position =e.clientY
    moving_mouse = true
})


function change_color(c){
    color = c
    context.strokeStyle = color
    context.stroke()
}

function delete_all() {
    socket.emit('delete')
}


 function create_drawing () {
     if (click && moving_mouse && previous_position != null) {
         let draw = {
             x_position: x_position,
             y_position: y_position,
             color: color,
             previous_position: previous_position
         }
         socket.emit('draw', draw)
     }
     previous_position = {x_position:x_position, y_position:y_position}
     setTimeout(create_drawing, 25)
 }

 //function show_drawing(draw) {
socket.on('show_drawing', (draw) =>{
    if (draw!=null) {
        context.beginPath()
        context.lineWidth = 3
        context.strokeStyle = draw.color
        context.moveTo(draw.x_position, draw.y_position)
        context.lineTo(draw.previous_position.x_position,
            draw.previous_position.y_position)
        context.stroke()
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

})

socket.on('user', (number)=> {
    user.innerHTML = `Numero de ususario conectados: ${number}`
})


create_drawing()