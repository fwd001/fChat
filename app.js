const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)  //引入socket.io模块并绑定到服务器

app.use('/', express.static(__dirname + '/www'))

server.listen(9999);

io.sockets.on('connection', function(socket) {
  //接收并处理客户端发送的foo事件
  socket.on('send message', function(data) {
    //将消息输出到控制台
    io.sockets.emit('new message', {msg: data})
  })
})
