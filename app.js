var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 3000;

var painel = {};

app.use('/js',express.static(__dirname + '/js/'));
app.use('/css',express.static(__dirname + '/css/'));
app.use('/node_modules',express.static(__dirname + '/node_modules/'));
app.use('/img',express.static(__dirname + '/img/'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/admin', function(req, res){
	res.sendFile(path.join(__dirname + '/manager.html'));
});

http.listen(port, function(){
	console.log('listening on port 3000');
});

io.on("connection", function (socket) {
	console.log('connect');
    socket.on('start', function(h,m,s){
		console.log(h+'-'+m+'-'+s);	
		io.emit('start', h,m,s);
	});
	socket.on('restart', function(){
		io.emit('restart');
	});
	socket.on('pause', function(){	
		io.emit('pause');
	});
	socket.on('stop', function(){	
		io.emit('stop');
	});
	socket.on('message', function(msg){	
		io.emit('message',msg);
	});
});