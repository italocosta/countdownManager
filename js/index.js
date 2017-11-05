$(document).ready(function(){
	
    var socket = io.connect("http://countdown-manager.herokuapp.com:3000");
	var $clock = $('#clock');
	var $message = $('#message');
		
	socket.on('start', function(h,m,s){
		console.log(addTime(h,m,s));
		$clock.countdown(addTime(h,m,s), function(event) {
		  $(this).html(event.strftime('%H:%M:%S'));
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
	});
	socket.on('message', function(msg){
		$message.html(msg);
		$message.marquee({
			//speed in milliseconds of the marquee
			duration: 8000,
			//gap in pixels between the tickers
			gap: 1000,
			//time in milliseconds before the marquee will start animating
			delayBeforeStart: 0,
			//'left' or 'right'
			direction: 'left',
			//true or false - should the marquee be duplicated to show an effect of continues flow
			duplicated: true
		});
	});
});

function addTime(hours, minutes,seconds) {
    var dateFinal = new Date(new Date().getTime() + (hours*3600000) + (minutes*60000) + (seconds*1000));
    return dateFinal;
}
