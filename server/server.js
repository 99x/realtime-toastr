var app;
var http = require('http');

var server = http.Server(function(data){
	//console.log(data);
})

var io = require('socket.io')(server);


clients = [];
types = ["info", "warning", "success", "error"];
console.log("Running in :"  + process.env.NODE_ENV);

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
	console.log('A user connected to server');
	clients.push(socket.id);

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		var i = clients.indexOf(socket.id);
		clients.splice(i, 1);

		console.log('A user disconnected');
	});

	socket.on('userconnected', function (data) {
		console.log('User connected to cilent : ');
	});

});

server.listen(3001, function () {
	console.log('listening on *:3001');
});




module.exports = server;