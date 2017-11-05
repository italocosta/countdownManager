$(document).ready(function(){
    var socket = io();
	var $clock = $('#clock');
	var h = $('#hor').val();
	var m = $('#min').val();
	var s = $('#seg').val();

	$('#pause').click(function() {
		socket.emit('pause');
	});
	$('#restart').click(function() {
		socket.emit('restart');
	});
	$('#stop').click(function() {
		socket.emit('stop');
	});
	$('#start').click(function() {
		var h = $('#hor').val();
		var m = $('#min').val();
		var s = $('#seg').val();
		socket.emit('start',h,m,s);

	});
	$('#send').click(function() {
		var msg = $('#msg').val();
		socket.emit('message',msg);
	});
});
