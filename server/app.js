var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

//clients=[];

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');
//  clients.push(socket);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
//setInterval(function() {
//	clients[clients.length-1].emit('new message', "Last Connected User");
//},1000);

 socket.emit('new message', "toastr mesage");
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

