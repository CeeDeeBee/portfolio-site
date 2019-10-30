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
BORING - Go to the boring site.
CD [Directory] - Change to specifiec directory.
CD [..] - Change to parent directory.
DIR [FileName] - Display contents of specified directory. Defaults to current directory.
HELP - Prints this dialogue.
REBOOT - Reboots the OS.`
const directories = {
    'type': '<DIR>',
    'content': {
        'maker': {
            'type': '<DIR>',
            'content': {}
        },
        'writer': {
            'type': '<DIR>',
            'content': {}
        },
        'entrepreneur': {
            'type': 'TXT',
            'content': {}
        },
        'about': {
            'type': 'TXT',
            'content': {}
        }
    }
}
var booted = false;
//On DOM load
$(document).ready(function() {
    $(document).click(function (e) { 
        $('.forceKbInput').focus(); 
    });
    cursorInterval = bootSequence();
    initDir();
    let pathText = 'A:\\';
    let pathArray = [];
    let currentDirectory = directories;
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
            newLine();
        },
        'boring': function() {
            location.href = '/test-portfolio';
        },
        'dir': async function() {
            let dirSize = 0;
            $('.line').last().after($('<div></div>').addClass('line dirList'));
            $('.dirList').last().append('<br>Directory of ' + pathText + '<br><br>');
            let dirContent = currentDirectory['content']
            let longestItem = 0;
            for (let item in dirContent) {
                if (item.length > longestItem) {
                    longestItem = item.length;
                }
            }
            for (let item in dirContent) {
                textItem = item.toUpperCase();
                //Add item name
                for (let chr = 0; chr < textItem.length; chr ++) {
                    $('.dirList').last().append(textItem[chr]);
                    await sleep(0.25);
                }
                //Add spaces between item name and type
                for (let i = 0; i < ((longestItem + 1) - item.length); i ++) {
                    $('.dirList').last().append('&nbsp;');
                    await sleep(0.25);
                }
                //Add item type
                for (let i = 0; i < dirContent[item]['type'].length; i ++) {
                    $('.dirList').last().append(dirContent[item]['type'][i]);
                    await sleep(0.25);
                }
                $('.dirList').last().append('<br>');
                dirSize ++;
                await sleep(100);
            }
            for (let i = 0; i < longestItem - 1; i ++) {
                $('.dirList').last().append('&nbsp;');
            }
            $('.dirList').last().append(dirSize + ' File(s)' + '<br><br>');
            newLine();
        },
        'cd': async function(commandProps) {
            if (commandProps[0]) {
                if (commandProps[0] === '..') {
                    if (pathArray.length > 0) {
                        pathArray.pop();
                        let newDir = getNestedDir(pathArray);
                        currentDirectory = newDir;
                        pathText = pathText.split('\\')[0].concat('\\');
                        newLine();
                    } else {
                        dirNotFound();
                    }
                } else {
                    pathArray.push(commandProps[0]);
                    let newDir = getNestedDir(pathArray);
                    if (newDir) {
                        currentDirectory = newDir;
                        pathText = pathText.concat(commandProps[0].toUpperCase());
                        newLine();
                    } else {
                        pathArray.pop();
                        dirNotFound();
                    }
                }
            } else {
                $('.line').last().after($('<div></div>').addClass('line cdNoDir'));
                for (let chr in pathText) {
                    $('.cdNoDir').last().append(pathText[chr]);
                    await sleep(0.25);
                }
                $('.cdNoDir').last().append('<br><br>');
                newLine();
            }
        }
    };
	//Listen for keypresses
	$(document).on('keydown', function(e) {
		if (booted) {
			if (e.keyCode == 8) {
				//Delete last charcter if backspace is pushed
				$('.currentInput').html($('.currentInput').html().slice(0, -1));
			} else if (e.keyCode == 13) {
                //If enter is pushed
                let command = $('.currentInput').html().toLowerCase().split(' ');
                let baseCommand = command.shift();
				if (commands.hasOwnProperty(baseCommand)) {
					//If a command is entered
					commands[baseCommand](command);
				} else {
                    commandNotFound();
                }
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
    /*
    for (let chr in cbarnesOsStr) {
		$('#cbarnesOsStr').append(cbarnesOsStr[chr]);
		await sleep(0.25);
	}*/
	//Print booting notification
    const bootTextStr = 'Booting cbarn.es...';
    for (let chr in bootTextStr) {
		$('#bootText').append(bootTextStr[chr]);
		await sleep(0.25);
    }
    cursorInterval = cursor();
    //await sleep(3000);
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
    for (let chr in 'Bad command or file name') {
        $('.notFoundDiv').last().append('Bad command or file name'[chr]);
        await sleep(0.25);
    }
    $('.notFoundDiv').last().append('<br><br>');
    newLine();
}
/**
 * Print if directory doesn't exist
 */
async function dirNotFound() {
    $('.line').last().after($('<div></div>').addClass('line dirNotFound'));
    for (let chr in 'Invalid directory') {
        $('.dirNotFound').last().append('Invalid directory'[chr]);
        await sleep(0.25);
    }
    $('.dirNotFound').last().append('<br><br>');
    newLine();
}
/**
 * Initialize Directories
 */
function initDir() {
    $.getJSON('/static/data.json', function(data) {
        //Maker directory
        for (let i = 0; i < data['makerCards'].length; i ++) {
            directories['content']['maker']['content'][data['makerCards'][i]['title']] = { 
                'type': 'TXT', 
                'description': data['makerCards'][i]['description'],
                'tools': data['makerCards'][i]['tools'],
                'github': data['makerCards'][i]['github']
            };
        }
        //Writer directory
        for (let i = 0; i < data['writer'].length; i ++) {
            directories['content']['writer']['content'][data['writer'][i]['title']] = {
                'type': 'TXT',
                'text': data['writer'][i]['contentLocation']
            };
        }
    });
}

/**
 * Return nested dir
 */
function getNestedDir(pathArray) {
    if (pathArray.length > 0) {
        let dir = directories['content'];
        for (item in pathArray) {
            dir = dir[pathArray[item]];
        }
        if (dir && dir['type'] === '<DIR>') {
            return dir;
        } else {
            return undefined;
        }
    } else {
        return directories;
    }
}
