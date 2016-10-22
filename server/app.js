var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

clients=[];
types = ["info", "warn", "success","error"];

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');
  clients.push(socket.id);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
      var i = clients.indexOf(socket.id);
      clients.splice(i, 1);
   
    console.log('A user disconnected');
  });

//setTimeout(function(){
//	socket.emit('new message', socket.id);
//},5000);

});

function sendErrorMessage(socketid, data){
	io.to(socketid).emit('errorCount', data);
}

function sendFailMessage(socketid, data){
	io.to(socketid).emit('FailMessage', data)
}

function sendSuccessMessage(socketid, data){
	io.to(socketid).emit('SuccessMessage', data)
}

function createMessage(type, data){
	var jsonData = { type : type, message : data};
        return jsonData;
}


setInterval(function() {

	var i = Math.floor(Math.random() * 3) + 0;
        var length = clients.length; 
        var client = Math.floor(Math.random() * length) + 0;


        console.log(i);
	console.log(client);

	switch(i) {
	    case 0:
		var errorCount = Math.floor((Math.random() * 100) + 1);
        	var client = Math.floor(Math.random() * length) + 0;  
                var type = Math.floor(Math.random() * 4) + 0;
        	var data = createMessage(types[type], errorCount);
		sendErrorMessage(clients[client], JSON.stringify(data));
		break;
	    case 1:
		var errorCount = Math.floor((Math.random() * 100) + 1);
        	var client = Math.floor(Math.random() * length) + 0;  
        	var data = createMessage("error", "The operation was a failure");
		sendFailMessage(clients[client], JSON.stringify(data));
		break;
	    case 2:
		var errorCount = Math.floor((Math.random() * 100) + 1);
        	var client = Math.floor(Math.random() * length) + 0;  
        	var data = createMessage("success", "The operation was a success");
		sendSuccessMessage(clients[client], JSON.stringify(data));
	    default:
		break;
	}
	
},5000);

http.listen(3001, function(){
  console.log('listening on *:3001');
});




module.exports = app;
