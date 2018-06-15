var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  socket.broadcast.emit('hi');

  socket.on('chat message', function (data) {
    io.emit('chat message', {
      message: data.message,
      user: data.user
    });
  });

  socket.on('typing', function (user) {
    socket.broadcast.emit('typing', user);
  });

  socket.on('notTyping', function (user) {
    socket.broadcast.emit('notTyping', user);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('bye');
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
