$(document).ready(function(){
    var socket = io.connect("http://localhost:3000");
    var ready = false;
	var $clock = $('#clock');
	$('#pause').click(function() {
		$clock.countdown('pause');
	});
	$('#play').click(function() {
		$clock.countdown('resume');
	});
	$('#stop').click(function() {
		$clock.countdown();
	});
});


var countDownDate;
var sHora = $('#h');
var sMinuto = $('#m');
var sSegundos = $('#s');
var iHora = $('#hor');
var iMinuto = $('#min');
var iSegundos = $('#seg');

getValueSpan = function(span){
  return parseInt(span.html().replace(':',''));
}

getValueInput = function(input){
  return parseInt(input.val().replace(':',''));
}

param = function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var strHours = '',strMin = '',strSec= '';

  if(hours > 0){
    if(hours < 9){
      strHours += '0';
    }
    strHours+=hours+":";
    sHora.html(strHours);
  }
  if(minutes > 0){
    if(minutes < 9){
      strMin += '0';
    }
    strMin+=minutes+":";
    sMinuto.html(strMin);
  }
  if(seconds > 0){
    if(seconds < 9){
      strSec += '0';
    }
    strSec+=seconds;
    sSegundos.html(strSec);
  }
  
  if (distance < 0) {
    stopService();
  }
}

startService = function(){
  service = setInterval(param, 1000);
}
stopService = function(){
  clearInterval(service);
  service = null;
  sHora.html('00:');
  sMinuto.html('00:');
  sSegundos.html('00');
}



start = function(){
  var now = new Date();
  now.setHours(now.getHours()+getValueInput(iHora));
  now.setMinutes(now.getMinutes()+getValueInput(iMinuto));
  now.setSeconds(now.getSeconds()+getValueInput(iSegundos));
  countDownDate = now;
  startService();
}
restart = function(){
  var now = new Date();
  now.setHours(now.getHours()+getValueSpan(sHora));
  now.setMinutes(now.getMinutes()+getValueSpan(sMinuto));
  now.setSeconds(now.getSeconds()+getValueSpan(sSegundos));
  countDownDate = now;
  startService();
}
pause = function(){
  clearInterval(service);
  service = null;
}
stop = function(){
  stopService();
}
