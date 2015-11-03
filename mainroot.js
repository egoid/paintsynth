'use strict';

$(document).ready(init);


var init =  ( function() {

	var canvasPad ;
	var arrx = [];
	var arry = [];
	



  if (canvas.getContext) {

    var ctx = canvas.getContext('2d');
  }

	var drawpad = function() {

		canvasPad = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		//myAudioContext = new AudioContext() ;
		drawpad.setupEventListeners();

	};	




	drawpad.setupEventListeners = function() {

		document.body.addEventListener('touchmove', function(event) {
	    event.preventDefault();
	  	}, false);

	  	canvasPad.addEventListener('mousedown' , drawpad.clicking)
	  	canvasPad.addEventListener('mouseup' , drawpad.lettingGo)
	  	canvasPad.addEventListener('mouseleave' , drawpad.lettingGo)
	}

	drawpad.clicking = function(event) {
		var xCoord = (event.x - this.offsetLeft)
		var yCoord = (event.y - this.offsetTop)
		ctx.beginPath();
		// ctx.moveTo( xCoord , yCoord )
		// ctx.lineTo ( xCoord+1 , yCoord+1 )
		 ctx.lineWidth = 10.0 ;
		 ctx.strokeStyle = '#CC0000';
		// ctx.stroke()
		canvasPad.addEventListener('mousemove' , drawpad.movingOn )
		canvasPad.addEventListener('mouseout' , drawpad.lettingGo)
	}

	drawpad.lettingGo = function (event) {
		console.log(arrx)
		console.log(arry)
		canvasPad.removeEventListener('mouseout' , drawpad.lettingGo)
		canvasPad.removeEventListener('mousemove' , drawpad.movingOn)

	}

	drawpad.calculateVector = function (x,y) {

		arrx.push(x);
		arry.push(y);

		drawpad.draw();

	}

	drawpad.draw = function(event) {

		ctx.clearRect ( 0 , 0 , ctx.canvas.width , ctx.canvas.height);
		ctx.strokeStyle = '#df4b26';
		ctx.lineJoin = 'round' ;
		ctx.lineWidth = 5;

		for (var i=0 ; i<arrx.length ; i++) {
			ctx.beginPath();
			ctx.moveTo(arrx[i-1] , arry[i-1])
			ctx.lineTo(arrx[i] , arry[i]) ;
			ctx.closePath();
			ctx.stroke();
		}

	}

	

	drawpad.movingOn = function(event) {

			drawpad.calculateVector ( event.x , event.y )

	}




	return drawpad();
})();