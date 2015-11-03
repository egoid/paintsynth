'use strict';

$(document).ready(init) ;

var init =  ( function() {

	var canvaspad ;
	var arrx = [];
	var arry = [];
	var frequencyLabel ; 
	var volumeLabel ;
	var myAudioContext ; 
	var oscillator ; 
	var gaineNode ;
	var lowNote = 261.63 ;
	var highNote= 493.88 ;
  	if (canvas.getContext) {
    	var ctx = canvas.getContext('2d');
  	}

	var drawpad = function() {

		canvaspad = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');

		frequencyLabel = document.getElementById('frequency');
		volumeLabel = document.getElementById('volume');
		myAudioContext = new AudioContext() ;

		drawpad.setupEventListeners(); 

	};	
			drawpad.setupEventListeners = function() {

				document.body.addEventListener('touchmove', function(event) {
			    event.preventDefault();
			  	}, false);

			  	canvaspad.addEventListener('mousedown' , drawpad.clicking)
			  	canvaspad.addEventListener('mouseup' , drawpad.lettingGo)
			  	canvaspad.addEventListener('mouseleave' , drawpad.lettingGo)
			}

			drawpad.clicking = function(event) {

				oscillator = myAudioContext.createOscillator() ;
				gaineNode = myAudioContext.createGain() ;
				oscillator.type = 'triangle' ;
				gaineNode.connect(myAudioContext.destination);
				oscillator.connect ( gaineNode ) ;		
			  	oscillator.start();

				canvaspad.addEventListener('mousemove' , drawpad.movingOn )
				canvaspad.addEventListener('mouseout' , drawpad.lettingGo)
			}

					drawpad.movingOn = function(event) {

							drawpad.calculateVector ( event.x , event.y )
					}

						drawpad.calculateVector = function (x,y) {

							arrx.push(x);
							arry.push(y);
							
							var noteValue = drawpad.calculateNote(x); 
							var volumeValue = drawpad.calculateVolume(y);

							oscillator.frequency.value = noteValue ;
							gaineNode.gain.value = volumeValue ;

							frequencyLabel.innerHTML = Math.floor(noteValue) + 'Hz';
							volumeLabel.innerHTML = Math.floor (volumeValue * 100) + '%' ;

							drawpad.draw();
						}


								drawpad.calculateNote = function (posX) {

									var noteDifference = highNote - lowNote
									var noteOffset = (noteDifference / canvaspad.offsetWidth) * (posX - canvaspad.offsetLeft) ;
									return lowNote + noteOffset ;
								}

								drawpad.calculateVolume = function (posY) {

									var volumeLevel = 1 - ((( 100 / canvaspad.offsetHeight) * (posY - canvaspad.offsetTop))/100);
									return volumeLevel ;

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
			drawpad.lettingGo = function (event) {
				oscillator.stop();
				canvaspad.removeEventListener('mouseout' , drawpad.lettingGo)
				canvaspad.removeEventListener('mousemove' , drawpad.movingOn)
			}

	return drawpad();
})();
