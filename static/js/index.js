var cbarnesOsStr = `
 /$$$$$$$$ /$$                
|__  $$__/| $$                
   | $$   | $$$$$$$   /$$$$$$ 
   | $$   | $$__  $$ /$$__  $$
   | $$   | $$  \\ $$| $$$$$$$$
   | $$   | $$  | $$| $$_____/
   | $$   | $$  | $$|  $$$$$$$
   |__/   |__/  |__/ \\_______/
                             
                             
                                      /$$                                                            
                                     | $$                                                            
                             /$$$$$$$| $$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$       /$$$$$$   /$$$$$$$
                            /$$_____/| $$__  $$ |____  $$ /$$__  $$| $$__  $$     /$$__  $$ /$$_____/
                           | $$      | $$  \\ $$  /$$$$$$$| $$  \\__/| $$  \\ $$    | $$$$$$$$|  $$$$$$ 
                           | $$      | $$  | $$ /$$__  $$| $$      | $$  | $$    | $$_____/ \\____  $$
                           |  $$$$$$$| $$$$$$$/|  $$$$$$$| $$      | $$  | $$ /$$|  $$$$$$$ /$$$$$$$/
                            \\_______/|_______/  \\_______/|__/      |__/  |__/|__/ \\_______/|_______/ 
                                                                                                                                              

                                                                                                     /$$$$$$   /$$$$$$ 
                                                                                                    /$$__  $$ /$$__  $$
                                                                                                   | $$  \\ $$| $$  \\__/
                                                                                                   | $$  | $$|  $$$$$$ 
                                                                                                   | $$  | $$ \\____  $$
                                                                                                   | $$  | $$ /$$  \\ $$
                                                                                                   |  $$$$$$/|  $$$$$$/
                                                                                                    \\______/  \\______/ 
                   `
var booted = false;
//On DOM load
$(document).ready(function() {
	cursorInterval = bootSequence();
	const commands = {
        'reboot': function() {
            booted = false;
            $(document.body).append($('#cursor'));
            clearInterval(cursorInterval);
            $('.pointerDiv').remove();
            $('#bootText').css('display', 'block');
            $('#cbarnesOsStr').css('display', 'block');
            cursorInterval = bootSequence();
        },
        'help': function() {
            $('.pointerDiv').last().after($('<div></div>').addClass('helpDiv'));
            for (let [key, value] of Object.entries(descriptions)) {
                $('.helpDiv').append(key + ' - ' + value + '\n');
            }
        }
    };
    const descriptions = {
        'reboot': 'Reboots the OS',
        'help': 'Prints this dialogue'
    }
	//Look for keypresses
	$(document).on('keydown', function(e) {
		if (booted) {
            console.log(e.keyCode);
			if (e.keyCode == 8) {
				//Delete last charcter if backspace is pushed
				$('.currentInput').html($('.currentInput').html().slice(0, -1));
			} else if (e.keyCode == 13) {
                //If enter is pushed
                var command = $('.currentInput').html().toLowerCase();
				if (commands.hasOwnProperty(command)) {
					//If a command is entered
					commands[command]();
				}
				newLine();
			} else if (e.keyCode != 16) {
				$('.currentInput').append(e.key);
			}
		}
	});
    /*
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");    
    window.onresize = initCanvas;

    var frame = 1;
    var cursorX = 0;
    var cursorY = 0;
    finishedBoot = false;
    var pointerY = 35;
    var currentEntry = [];
    initCanvas();

    //handle keystrokes
    $(document).on("keydown", function(e) {
        if (finishedBoot) {
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
        }
    });
    */
});

/**
 * Function to allow async function to pause for specified time
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Makes cursor blink
 */
function cursor() {
    var cursorDisplayed = false;
    var cursorInterval = setInterval(function() {
        if (cursorDisplayed) {
            $('#cursor').empty();
            cursorDisplayed = false;
        } else {
            $('#cursor').html('_');
            cursorDisplayed = true;
        }
    }, 350);

    return cursorInterval;
}

/**
 * Static boot sequence that runs when page opens
 */
async function bootSequence() {
	//Print ASCII art
    for (let chr in cbarnesOsStr) {
		$('#cbarnesOsStr').append(cbarnesOsStr[chr]);
		//await sleep(0.25);
	}
	//Print booting notification
    const bootTextStr = 'Booting cbarn.es...';
    for (let chr in bootTextStr) {
		$('#bootText').append(bootTextStr[chr]);
		await sleep(0.25);
    }
	cursorInterval = cursor();
    //await sleep(3000);
    //Clear boot screen
	$('#bootText').empty().css('display', 'none');
    $('#cbarnesOsStr').empty().css('display', 'none');
    //Setup terminal interface
    $('#bootText').after($('<div></div>').addClass('pointerDiv'));
    $('.pointerDiv').append($('<div></div>').html('A>').addClass('pointer currentPointer'));
	$('.pointerDiv').append($('<div></div>').addClass('input currentInput'));
    $('.currentPointer').html('A>')
    $('.pointerDiv').append($('#cursor'));
    booted = true;
    
    return cursorInterval;
}
/**
 * Makes new line in terminal
 */
function newLine() {
	//Make new pointer div
	$('.pointerDiv').last().after($('<div></div>').addClass('pointerDiv'));
	//Remove current classes from old pointer and input
	$('.currentPointer').removeClass('currentPointer');
	$('.currentInput').removeClass('currentInput');
	//Create new pointer and input divs
	$('.pointerDiv').last().append($('<div></div>').html('A>').addClass('pointer currentPointer'));
	$('.pointerDiv').last().append($('<div></div>').addClass('input currentInput'));
	//Move cursor into new line div
	$('.pointerDiv').last().append($('#cursor'));
}
