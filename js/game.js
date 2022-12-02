let canvas;
let world;
let allIntervalls = [];
let moveMobile = false;
let mobile = /Mobi/.test(navigator.userAgent);
let keyboard;
const CANVAS_WIDTH = 800;
let sounds = {
    startSong: new Audio('audio/background.mp3'),
    swimSound: new Audio('audio/swim.mp3'),
    collectCoin: new Audio('audio/coin.mp3'),
    soundWhileShoot: new Audio('audio/whileShoot.mp3'),
    jellyHit: new Audio('audio/bubble-pop.mp3'),
    electricHit: new Audio('audio/zap.mp3'),
    hitSound: new Audio('audio/hurt.mp3'),
    slap: new Audio('audio/slap.mp3'),
    collectPoison: new Audio('audio/poison.mp3'),
    bossMusic: new Audio('audio/boss.mp3'),
    bossHit: new Audio('audio/boss-hurt.mp3'),
}
let soundOn = true;
let gameEnd = false;
let winningGame = false;


function getId(id) {
    return document.getElementById(id)
}


/**
 * Main Function for initialising The Game
 */
function init() {
    checkForMobile();
    canvas = getId('canvas');
    keyboard = new Keyboard(moveMobile);
    world = new World(canvas, keyboard);
    getId('canvas').classList.remove('d-none');
    setAllVolumes();
}


/**
 * This function is for clearing all Intervall
 */
function clearAllIntervalls() {
    for (let i = 0; i < 9999; i++) {
        const clearableIntervalls = allIntervalls[i];
        clearInterval(clearableIntervalls)
    }
}


/**
 * Function for Detecting Mobile Device and if it is a mobile phone
 * the MObile Buttons will be shown
 */
function checkForMobile() {
    // && screen.availHeight > screen.availWidth && window.matchMedia('(max-width:900px)') && window.matchMedia('(max-height:450px)')
    if (mobile) {
        moveMobile = true;
        getId('mobileInstructions').classList.add('mobileInstructions');
        getId('mobileInstructions').innerHTML = '';
        getId('mobileInstructions').innerHTML += createMobileSection();
    }
}

/**
 * 
 * @param {takes a Function which has to be in an Intervall} fn 
 * @param {*time for Intervall} time 
 */
function stopableInterval(fn, time) {
    let idIntervall = setInterval(fn, time);
    allIntervalls.push(idIntervall);
}


/**
 * 
 * @param {sound which volume has to be lower} song 
 */
function setVolume(song) {
    song.volume = 0.1;
    // song.loop = true;
}


/**
 * setting all volumes
 */
function setAllVolumes() {
    setVolume(sounds.collectCoin);
    setVolume(sounds.collectPoison);
    setVolume(sounds.startSong);
    setVolume(sounds.hitSound);
    setVolume(sounds.slap);
    setVolume(sounds.soundWhileShoot);
    setVolume(sounds.jellyHit);
    setVolume(sounds.electricHit);
    setVolume(sounds.swimSound);
    setVolume(sounds.bossMusic);
    setVolume(sounds.bossHit);
}


/**
 * This Function is for toggling The Sounds
 */
function switchSound() {
    soundOn = !soundOn;
    if (soundOn) {
        getId('mute').src = 'img/volume.png'
    } else {
        getId('mute').src = 'img/mute.png'
    }

}

/**
 * This function is for hiding the Startscreen
 */
function showGame() {
    getId('startscreen').classList.add('fade-out-bck');
    setTimeout(() => {
        getId('startscreen').classList.add('d-none');
    }, 1600)
    getId('canvas').classList.remove('d-none');
    init();
}


/**
 * This function shows the settingBox
 */
function openSettingsBox() {
    getId('settingImg').classList.add('d-none');
    getId('instructions').classList.remove('d-none');
    getId('instructions').innerHTML = '';
    getId('instructions').innerHTML += settingsBox();
}

/**
 * Closing settingSection
 */
function closeSettingsBox() {
    getId('instructions').classList.add('d-none');
    getId('settingImg').classList.remove('d-none');
}


/**
 * showing gameInstructions
 */
function gameInstructios() {
    getId('instructions').classList.add('d-none');
    getId('settingImg').classList.add('d-none');
    getId('gameInstructions').innerHTML = '';
    getId('gameInstructions').innerHTML += createGameInstructions();
}

/**
 * function that displays the instructions for the game target
 */
function gameTarget() {
    getId('playInstructions').innerHTML = '';
    getId('playInstructions').innerHTML = createGameTarget();
    document.querySelector('.box').classList.add('d-none');
}

/**
 * goin back to Instructions
 */
function backToInstructions() {
    getId('playInstructions').innerHTML = '';
    getId('gameInstructions').innerHTML = '';
    getId('gameInstructions').innerHTML += createGameInstructions();
}


/**
 * closing the completely instructionBox
 */
function closeInstructions() {
    getId('settingImg').classList.remove('d-none');
    getId('playInstructions').classList.add('d-none');
    document.querySelector('.box').classList.add('d-none');
}

/**
 * Shows Fullscreen
 */
function fullScreen() {
    let fullScreen = getId('canvas');
    showfullScreen(fullScreen);
}


/**
 * 
 * @param {element that should be in Fullscreen} element 
 */
function showfullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * function for cancelling Fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


// call: imagePathLoad ('img/1.Sharkie/3.Swim/', 6(für images swimming vom character))
/**
 * 
 * @param {Image Path} path 
 * @param {*quantity of images with the same path} count 
 * @param {extention of image like 'png', 'svg' or anything else*} extention 
 * @returns 
 */
function imagePathLoad(path, count, extention = '.png') {
    let imgArr = [];
    for (let i = 1; i <= count; i++) {
        imgArr.push(path + i + extention);
    }
    return imgArr;
}

/**
 * This function shows The Game Over Screen
 */
function gameOver() {
    if (gameEnd) {
        gameEnd = false;
        sounds.startSong.pause();
        sounds.bossMusic.currentTime = 0;
        clearAllIntervalls();
        getId('gameover').style = 'background: radial-gradient(circle, rgba(183,81,215,0.5396752450980392) 0%, rgba(0,229,254,0.8646052170868348) 30%)';
        getId('gameover').innerHTML += '';
        getId('gameover').classList.add('gameOverSection');
        getId('gameover').classList.add('puff-in-hor');
        getId('gameover').innerHTML += createEndScreen();
    }
}

/**
 * This function shows the Winning Section
 */
function winGame() {
    if (winningGame) {
        winningGame = false;
        clearAllIntervalls();
        sounds.startSong.pause();
        sounds.bossMusic.pause();
        getId('gameover').style = 'background: radial-gradient(circle, rgba(250, 10, 243, 0.5396752450980392) 0%, rgba(0, 186, 254, 0.6741290266106443) 0%)';
        getId('gameover').innerHTML = '';
        getId('gameover').classList.add('gameOverSection');
        getId('gameover').classList.add('puff-in-hor');
        getId('gameover').innerHTML += createWinScreen();
    }
}

/**
 * This funtion is for restarting the Game
 */
function restart() {
    sounds.bossMusic.pause();
    sounds.startSong.pause();
    getId('gameover').innerHTML = '';
    getId('gameover').classList.remove('puff-in-hor');
    getId('gameover').classList.remove('gameOverSection');
    init();
}

/**
 * This function is for going back to Startscreen
 */
function exit() {
    getId('gameover').innerHTML = '';
    getId('gameover').classList.remove('puff-in-hor');
    getId('gameover').classList.remove('gameOverSection');
    getId('startscreen').classList.remove('fade-out-bck');
    getId('startscreen').classList.remove('d-none');
    sounds.startSong.pause();
    sounds.bossMusic.pause();
}


