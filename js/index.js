var socket = io();
var $clock = $('#clock');
var $message = $('#message');
var intervalHoraAgora;

$(document).ready(function(){
	
	showHoraAgora();
	
	socket.on('start', function(h,m,s){
		showMessage('');
		clearInterval(intervalHoraAgora);
		intervalHoraAgora = null;
		$clock.countdown(addTime(h,m,s), function(event) {
			$(this).html(event.strftime('%H:%M:%S'));
		},
		function(){
			showHoraAgora();
			showMessage("TEMPO ENCERRADO !!");
		});
	});
	socket.on('restart', function(){
		$clock.countdown('restart');
	});
	socket.on('pause', function(){
		$clock.countdown('pause');
	});
	socket.on('stop', function(){
		$clock.countdown(new Date());
		showMessage('');
	});
	socket.on('message', showMessage );
});

var showHoraAgora = function(){
	intervalHoraAgora = setInterval(function() {
		var horaNow = new Date();
		$clock.html(formataHora(horaNow));
	}, 1000);
}

var formataHora = function(date){
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var separator = ':';
	if(h < 10)
		h = '0'+h;
	if(m < 10)
		m = '0'+m;
	if(s < 10)
		s = '0'+s;
	
	return h+separator+m+separator+s;
}

var showMessage = function(msg){
	$message.html(msg);
	$message.marquee({
		//speed in milliseconds of the marquee
		duration: 5000,
		//gap in pixels between the tickers
		gap: 1000,
		//time in milliseconds before the marquee will start animating
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true
	});
}

function addTime(hours, minutes,seconds) {
    var dateFinal = new Date(new Date().getTime() + (hours*3600000) + (minutes*60000) + (seconds*1000));
    return dateFinal;
}
