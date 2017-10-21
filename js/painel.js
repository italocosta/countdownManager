$(document).ready(function(){
    var socket = io.connect("http://localhost:3000");
    var ready = false;
	var $clock = $('#clock');
	$('#pause').click(function() {
		$clock.countdown('pause');
	});
	$('#play').click(function() {
		$clock.countdown('restart');
	});
	$('#stop').click(function() {
		$clock.countdown(new Date());
	});
  $('#start').click(function() {
    var h = $('#hor').val();
    var m = $('#min').val();
    var s = $('#seg').val();
    $('#clock').countdown(addTime(h,m,s), function(event) {
      $(this).html(event.strftime('%H:%M:%S'));
    });
  });
});

function addTime(hours, minutes,seconds) {
    var dateFinal = new Date(new Date().getTime() + (hours*3600000) + (minutes*60000) + (seconds*1000));
    return dateFinal;
}