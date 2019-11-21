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
HELP - Print this dialogue.
REBOOT - Reboot the OS.
TYPE [FileName]- Print content of TXT file.`
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
                scrollToBottom();
                await sleep(0.25);
            }
            newLine();
        },
        'boring': function() {
            location.href = '/test-portfolio';
        },
        'dir': async function(commandProps) {
            let dirToList;
            let dirPathText;
            if (commandProps.length > 0) {
                dirProp = commandProps[0].toLowerCase();
                pathArray.push(dirProp);
                dirToList = getNestedFile(pathArray);
                pathArray.pop();
                if (dirToList && dirToList['type'] === '<DIR>') {
                    dirToList = dirToList['content'];
                    dirPathText = pathText + commandProps[0] + '\\'; 
                } else {
                    printStr('File not found');
                    return;
                }
            } else {
                dirToList = currentDirectory['content'];
                dirPathText = pathText;
            }
            let dirSize = 0;
            $('.line').last().after($('<div></div>').addClass('line dirList'));
            $('.dirList').last().append('<br>');
            //Print dir statement
            let dirStatement = 'Directory of ' + dirPathText;
            for (let chr in dirStatement) {
                $('.dirList').last().append(dirStatement[chr]);
                scrollToBottom();
                await sleep(0.25);
            }
            $('.dirList').last().append('<br><br>');
            //Find longest directory length to set # of spaces between dir name and type
            let longestItem = 0;
            for (let item in dirToList) {
                if (item.length > longestItem) {
                    longestItem = item.length;
                }
            }
            //Print each of the items in the directory
            for (let item in dirToList) {
                textItem = item.toUpperCase();
                //Add item name
                for (let chr = 0; chr < textItem.length; chr ++) {
                    $('.dirList').last().append(textItem[chr]);
                    scrollToBottom();
                    await sleep(0.25);
                }
                //Add spaces between item name and type
                for (let i = 0; i < ((longestItem + 1) - item.length); i ++) {
                    $('.dirList').last().append('&nbsp;');
                    await sleep(0.25);
                }
                //Add item type
                for (let i = 0; i < dirToList[item]['type'].length; i ++) {
                    $('.dirList').last().append(dirToList[item]['type'][i]);
                    await sleep(0.25);
                }
                $('.dirList').last().append('<br>');
                scrollToBottom();
                dirSize ++;
                await sleep(100);
            }
            //Add spaces for file(s) statement
            for (let i = 0; i < longestItem - 1; i ++) {
                $('.dirList').last().append('&nbsp;');
                scrollToBottom();
                await sleep(0.25);
            }
            //Print file(s) statement
            let dirSizeStatement = dirSize + ' File(s)';
            for (let chr in dirSizeStatement) {
                $('.dirList').last().append(dirSizeStatement[chr]);
                scrollToBottom();
                await sleep(0.25);
            }
            $('.dirList').last().append('<br><br>');
            newLine();
        },
        'cd': async function(commandProps) {
            if (commandProps[0]) {
                if (commandProps[0] === '..') {
                    if (pathArray.length > 0) {
                        pathArray.pop();
                        let newDir = getNestedFile(pathArray);
                        currentDirectory = newDir;
                        pathText = pathText.split('\\')[0].concat('\\');
                        newLine();
                    } else {
                        printStr('Invalid directory');
                    }
                } else {
                    pathArray.push(commandProps[0]);
                    let newDir = getNestedFile(pathArray);
                    if (newDir && newDir['type'] === '<DIR>') {
                        currentDirectory = newDir;
                        pathText = pathText.concat(commandProps[0].toUpperCase());
                        newLine();
                    } else {
                        pathArray.pop();
                        printStr('Invalid directory');
                    }
                }
            } else {
                printStr(pathText);
            }
        },
        'type': async function(commandProps) {
            if (commandProps[0]) {
                if (pathArray.length > 0) {
                    pathArray.push('content', commandProps[0]);
                } else {
                    pathArray.push(commandProps[0]);
                }
                let newDir = getNestedFile(pathArray);
                if (newDir && newDir['type'] === 'TXT') {
                    //If printing a maker description
                    if (pathArray.includes('maker')) {
                        let description = newDir['description'];
                        printStr(description, makeNewLine = false).then(function() {
                            let tools = newDir['tools'];
                            printStr(tools, makeNewLine = false).then(function() {
                                if (newDir['github']) {
                                    let github = 'Github: ' + newDir['github'];
                                    printStr(github);
                                } else {
                                    newLine();
                                }
                            });
                        });
                    }
                    //If printing entrepreneur 
                    else if (commandProps[0] === 'entrepreneur') {
                        printStr('Afterbang Software: https://twitter.com/AfterbangLLC');
                    }
                    //If printing about
                    else if (commandProps[0] === 'about') {
                        console.log(newDir);
                        let description = newDir['content']['description'];
                        printStr(description, makeNewLine = false).then(function() {
                            let resume = 'Resume: https://cbarn.es/static/' + newDir['content']['resume'];
                            printStr(resume, makeNewLine = false).then(async function() {
                                for (let item in newDir['content']['social']) {
                                    let socialTxt = item[0].toUpperCase() + item.slice(1    ) + ': ' + newDir['content']['social'][item];
                                    await printStr(socialTxt, makeNewline = false);
                                }
                                newLine();
                            });
                        });
                    }
                } else {
                    printStr('File not found');
                }
                for (let i = 0; i < 2; i ++) {
                    pathArray.pop();
                }
            } else {
                printStr('Invalid number of parameters');
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
    scrollToBottom();
}
/**
 * Scroll to bottom of page
 */
function scrollToBottom() {
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
 * Print if string below last line
 */
async function printStr(str, makeNewLine = true) {
    $('.line').last().after($('<div></div>').addClass('line'));
    for (let chr in str) {
        $('.line').last().append(str[chr]);
        scrollToBottom();
        await sleep(0.25);
    }
    $('.line').last().append('<br><br>');
    if (makeNewLine) {
        newLine();
    }
}
/**
 * Initialize Directories
 */
function initDir() {
    $.getJSON('/static/data.json', function(data) {
        //Maker directory
        for (let i = 0; i < data['makerCards'].length; i ++) {
            directories['content']['maker']['content'][data['makerCards'][i]['id']] = { 
                'type': 'TXT', 
                'description': data['makerCards'][i]['description'],
                'tools': data['makerCards'][i]['tools'],
                'github': data['makerCards'][i]['github']
            };
        }
        //Writer directory
        for (let i = 0; i < data['writer'].length; i ++) {
            directories['content']['writer']['content'][data['writer'][i]['id']] = {
                'type': 'TXT',
                'text': data['writer'][i]['contentLocation']
            };
        }
        //About File
        directories['content']['about']['content'] = {
            'type': 'TXT',
            'description': data['about']['description'],
            'resume': data['about']['resume'],
            'social': {}
        }
        for (let i = 0; i < data['about']['socialLinks'].length; i ++) {
            directories['content']['about']['content']['social'][data['about']['socialLinks'][i]['type']] = data['about']['socialLinks'][i]['link'];
        }
    });
    console.log(directories);
}

/**
 * Return nested dir
 */
function getNestedFile(pathArray) {
    if (pathArray.length > 0) {
        let file = directories['content'];
        for (item in pathArray) {
            try {
                file = file[pathArray[item]];
            } catch(error) {
                return undefined;
            }
        }
        if (file) {
            return file;
        } else {
            return undefined;
        }
    } else {
        return directories;
    }
}
