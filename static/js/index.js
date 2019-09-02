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
//On DOM load
$(document).ready(function() {
    bootSequence();
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

    function eraseCursor() {
        ctx.fillStyle = '#282828';
        ctx.fillRect(cursorX - 1, cursorY - 1, 12, 17);
    }

    function animateCursor() {
        //draw cursor
        if (frame % 2 == 0) {
            ctx.fillStyle = '#33ff33';
            ctx.fillRect(cursorX, cursorY, 10, 15);
            frame += 1;
        } else {
            eraseCursor();
            frame += 1;
        }

        setTimeout(function() {
            requestAnimationFrame(animateCursor);
        }, 350);
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
    */
    /**
     * Function to allow program to pause for specified time
     
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    */
    /**
     * Boot sequence that runs when user first open page or runs reboot
     
    async function bootSequence() {
        ctx.font = '12px IBMPC';
        ctx.fillStyle = '#33ff33';
        ctx.fillText('Booting cbarn.es...', canvas.width * 0.02, canvas.height * 0.02);
        cursorX = canvas.width * 0.02;
        cursorY = canvas.width * 0.03;
        animateCursor();
        await sleep(2500);
        eraseCursor();
        cursorY = canvas.width * 0.04;
        ctx.fillStyle = '#33ff33';
        ctx.fillText('The cbarn.es OS', canvas.width * 0.02, canvas.height * 0.05)
        finishedBoot = true;
    }

    function initCanvas() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        //setBackground();
        bootSequence();
        drawPointer();
    }
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
    setInterval(function() {
        if (cursorDisplayed) {
            $('#cursor').empty();
            cursorDisplayed = false;
        } else {
            $('#cursor').html('_');
            cursorDisplayed = true;
        }
    }, 350);
}

/**
 * Static boot sequence that runs when page opens
 */
async function bootSequence() {
    var bootTextStr = 'Booting cbarn.es...';
    for (let chr in bootTextStr) {
        var currentText = $('#bootText').html();
        $('#bootText').html(currentText + bootTextStr[chr]);
        await sleep(0.25);
    }
	cursor();
	await sleep(2000);
	$('#bootText').empty().css('display', 'none');
    for (let chr in cbarnesOsStr) {
        var currentText = $('#cbarnesOsStr').html();
        $('#cbarnesOsStr').html(currentText + cbarnesOsStr[chr]);
        await sleep(0.25);
    }
}
