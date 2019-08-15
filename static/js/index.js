//On DOM load
$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");	
	window.onresize = initCanvas;

	var frame = 1;
	var cursorX = 137;
	var cursorY = 23;
	var pointerY = 35;
	var currentEntry = [];
	initCanvas();

	$(document).on("keydown", function(e) {
		//ßconsole.log(e);
		//if user pushes backspace
		if (e.keyCode == 8) {
			if (cursorX > 122) {
				//draw background color over area to write letter
				ctx.fillStyle = '#282828';
				ctx.fillRect(cursorX, cursorY, 100, 15);
				//update cursor location
				if (cursorX - keyWidth < 122) {
					cursorX = 122;
				} else {
					cursorX -= ctx.measureText(currentEntry.pop()).width;
				}
			}
		} else if (e.keyCode == 13) {
			if (currentEntry.join('') == 'home') {
				$('#headshot').show();
				ctx.drawImage(document.getElementById('headshot'), 100, 100);
			}
			//draw background color over area to write letter
			ctx.fillStyle = '##282828';
			ctx.fillRect(cursorX, cursorY, 10, 15);
			//update cursor and pointer locations
			pointerY += 20;
			cursorX = 122;
			cursorY += 20;
			drawPointer();
		} else if (e.keyCode != 20 && e.keyCode != 16 && e.keyCode != 9 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 91){
			//get width of entered key
			keyWidth = ctx.measureText(e.key).width;
			//draw background color over area to write letter
			ctx.fillStyle = '#282828';
			ctx.fillRect(cursorX, cursorY, 10, 15);
			//draw letter
			ctx.font = '12px IBMPC';
			ctx.fillStyle = '#33ff33';
			ctx.fillText(e.key, cursorX, cursorY + 12);
			//update cursor location
			cursorX += keyWidth;
			currentEntry.push(e.key);
		}
	});

	function drawCursor() {
		//draw cursor
		if (frame % 2 == 0) {
			ctx.fillStyle = '#33ff33';
			ctx.fillRect(cursorX, cursorY, 10, 15);
			frame = 1;
		} else {
			ctx.fillStyle = '#282828';
			ctx.fillRect(cursorX, cursorY, 10, 15);
			frame += 1;
		}

		setTimeout(function() {
			requestAnimationFrame(drawCursor);
		}, 1000);
	}

	function drawPointer() {
		//draw file pointer
		ctx.font = '12px IBMPC';
		ctx.fillStyle = '#33ff33';
		ctx.fillText('cbarn.es/index$', 25, pointerY);
	}

	function setBackground() {
		ctx.fillStyle = '#282828';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function initCanvas() {
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		var dashLen = $('#-Len').width();
		$('#headerDelim').text(' ___'.repeat(window.innerWidth / dashLen - 1));
		setBackground();
		drawPointer();
		drawCursor();
	}
});