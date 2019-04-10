const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server) //引入socket.io模块并绑定到服务器
const router = require('./router')
let users = []

app.use('/', express.static(__dirname + '/www'))

//中间件,我整个服务器的接口全部允许跨域
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

app.use(router)

server.listen(9999)

io.sockets.on('connection', function(socket) {
  // 用户离开
  socket.on('disconnect', function() {
    if (socket.nickname != null) {
      //users.splice(socket.userIndex, 1);
      users.splice(users.indexOf(socket.nickname), 1)
      socket.broadcast.emit('system', socket.nickname, users.length, 'logout')
    }
  })

  // 用户登陆
  socket.on('login', function(nickname) {
    if (users.indexOf(nickname) > -1) {
        socket.emit('nickExisted');
    } else {
        //socket.userIndex = users.length;
        socket.nickname = nickname;
        users.push(nickname);
        socket.emit('loginSuccess');
        io.sockets.emit('system', nickname, users.length, 'login');
    };
});
  //接收并处理客户端发送的foo事件
  socket.on('send message', function(data) {
    //将消息输出到控制台
    const date = new Date()
    const response = {
      ...data,
      date
    }
    io.sockets.emit('new message', response)
  })
})
