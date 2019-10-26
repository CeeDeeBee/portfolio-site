const cbarnesOsStr = `
                                                                            
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
const osInfo1 = `The CBarn.es Networked BOS
Version 1.00 `
const osInfo2 = `(C)Copyright CBarn.es Corp 2019

Enter "help" To List Commands`

const descriptions = `Commands:
Reboot - Reboots the OS
Help - Prints this dialogue
Boring - Go back to the boring site`
var booted = false;
//On DOM load
$(document).ready(function() {
    $(document).click(function (e) { 
        $('.forceKbInput').focus(); 
    });
	cursorInterval = bootSequence();
	const commands = {
        'reboot': function() {
            booted = false;
            $(document.body).append($('#cursor').empty());
            clearInterval(cursorInterval);
            $('#osInfo').empty();
            $('.line').remove();
            $('#bootText').css('display', 'block').after($('#cursor'));
            $('#cbarnesOsStr').css('display', 'block');
            cursorInterval = bootSequence();
        },
        'help': async function() {
            $('.line').last().after($('<pre></pre>').addClass('line helpDiv'));
            for (let chr in descriptions) {
                $('.helpDiv').last().append(descriptions[chr]);
                await sleep(0.25);
            }
        },
        'boring': function() {
            location.href = '/test-portfolio';
        }
    };
	//Listen for keypresses
	$(document).on('keydown', function(e) {
		if (booted) {
            //console.log(e.keyCode);
			if (e.keyCode == 8) {
				//Delete last charcter if backspace is pushed
				$('.currentInput').html($('.currentInput').html().slice(0, -1));
			} else if (e.keyCode == 13) {
                //If enter is pushed
                var command = $('.currentInput').html().toLowerCase();
				if (commands.hasOwnProperty(command)) {
					//If a command is entered
					commands[command]();
				} else {
                    commandNotFound();
                }
				newLine();
			} else if (e.keyCode != 16) {
				$('.currentInput').text($('.currentInput').text() + e.key);
			}
		}
	});
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
		await sleep(0.25);
	}
	//Print booting notification
    const bootTextStr = 'Booting cbarn.es...';
    for (let chr in bootTextStr) {
		$('#bootText').append(bootTextStr[chr]);
		await sleep(0.25);
    }
    cursorInterval = cursor();
    await sleep(3000);
    $('#cursor').hide();
    //Clear boot screen
	$('#bootText').empty().css('display', 'none');
    $('#cbarnesOsStr').empty().css('display', 'none');
    //Setup terminal interface
    for (let chr in osInfo1) {
        $('#osInfo').append(osInfo1[chr]);
        await sleep(0.25);
    }
    $('#osInfo').append('<br>');
    for (let chr in osInfo2) {
        $('#osInfo').append(osInfo2[chr]);
        await sleep(0.25);
    }
    $('#shell').append($('<div></div>').addClass('line'));
    $('.line').append($('<div></div>').html('A>').addClass('pointer currentPointer'));
	$('.line').append($('<div></div>').addClass('input currentInput'));
    $('.line').append($('#cursor').show());
    booted = true;
    
    return cursorInterval;
}
/**
 * Makes new line in terminal
 */
function newLine() {
	//Make new pointer div
	$('.line').last().after($('<div></div>').addClass('line'));
	//Remove current classes from old pointer and input
	$('.currentPointer').removeClass('currentPointer');
	$('.currentInput').removeClass('currentInput');
	//Create new pointer and input divs
	$('.line').last().append($('<div></div>').html('A>').addClass('pointer currentPointer'));
	$('.line').last().append($('<div></div>').addClass('input currentInput'));
	//Move cursor into new line div
    $('.line').last().append($('#cursor'));
    //Scroll to bottom of page
    $('#shell').scrollTop($('#shell')[0].scrollHeight);
}
/**
 * Print if user enters invalid command
 */
async function commandNotFound() {
    $('.line').last().after($('<div></div>').addClass('line notFoundDiv'));
    for (let chr in 'Command Not Found') {
        $('.notFoundDiv').last().append('Command Not Found'[chr]);
        await sleep(0.25);
    }
}
