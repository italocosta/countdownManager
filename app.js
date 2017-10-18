var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var painel = {};

app.use('/js',express.static(__dirname + '/js/'));
app.use('/css',express.static(__dirname + '/css/'));
app.use('/node_modules',express.static(__dirname + '/node_modules/'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

//SocketIO vem aqui

http.listen(3000, function(){
console.log('listening on port 3000');
});

io.on("connection", function (client) {
    console.log('user connected');
});