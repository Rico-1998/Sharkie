let canvas;
let world;
let allIntervalls = [];
let moveMobile = false;
let mobile = /Mobi/.test(navigator.userAgent);
let keyboard;
const CANVAS_WIDTH = 800;
let sounds = {
    startSong: new Audio('audio/1-20 Touka City.mp3'),
    swimSound: new Audio('audio/swim.mp3'),
    collectCoin: new Audio('audio/coin.mp3'),
    soundWhileShoot: new Audio('audio/whileShoot.mp3'),
    jellyHit: new Audio('audio/bubble-pop.mp3'),
    hitSound: new Audio('audio/hurt.mp3'),
    slap: new Audio('audio/slap.mp3'),
    collectPoison: new Audio('audio/poison.mp3'),
    bossMusic: new Audio('audio/boss.mp3'),
    bossHit: new Audio('audio/boss-hurt.mp3'),
}
let soundOn = true;
let gameEnd = false;


/**
 * Main Function for initialising The Game
 */
function init() {
    checkForMobile();
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard(moveMobile);
    world = new World(canvas, keyboard);
    document.getElementById('canvas').classList.remove('d-none');
    console.log('my character is', world.character);
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
        document.getElementById('mobileInstructions').classList.add('mobileInstructions');
        document.getElementById('mobileInstructions').innerHTML = '';
        document.getElementById('mobileInstructions').innerHTML += createMobileSection();
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
 * This function sets 2 Eventlisteners for the Mute Button
 * first For Normal Pcs
 * Second for Mobile Devices
 */
function setListener() {
    document.getElementById('mute').addEventListener('mouseup', (e) => {
        e.preventDefault();
        switchSound();
    });
    document.getElementById('mute').addEventListener('touchend', (e) => {
        e.preventDefault();
        switchSound();
    });
}

/**
 * 
 * @param {sound which volume has to be lower} song 
 */
function setVolume(song) {
    song.volume = 0.1;
    song.loop = true;
}


function setAllVolumes() {
    setVolume(sounds.collectCoin);
    setVolume(sounds.collectPoison);
    setVolume(sounds.startSong);
    setVolume(sounds.hitSound);
    setVolume(sounds.slap);
    setVolume(sounds.soundWhileShoot);
    setVolume(sounds.jellyHit);
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
        sounds.startSong.play();
        document.getElementById('mute').src = 'img/volume.png'
    } else {
        document.getElementById('mute').src = 'img/mute.png'
        sounds.startSong.pause();
    }

}

/**
 * This function is for hiding the Startscreen
 */
function showGame() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
}


/**
 * This function shows the How To Play Section
 */
function openHowToPlay() {
    document.getElementById('instructions').classList.remove('d-none');
    document.getElementById('instructions').innerHTML = '';
    document.getElementById('instructions').innerHTML += createHowToPlaySection();
}

/**
 * Closing How To Play Section
 */
function closeHowToPlaySection() {
    document.getElementById('instructions').classList.add('d-none');
}

/**
 * Shows Fullscreen
 */
function fullScreen() {
    let fullScreen = document.getElementById('canvas');
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
    // es wir zu allererst ein aray erzeugt
    let imgArr = [];
    // in der for schleife gemacht die bei 1 anfängt weil die bildpfade (1.png zum bsp) immer bei 1 anfangen.
    // i <= count weil in den parametern der funktion die länge der zu ladenden bilder mit reingegeben wird.
    // anschliessend wird in das arr der bild pfad(img/1.Sharkie/3.Swim/ zum bsp reingegben und der bildpfad ist immer bis zum letzten / vor dem 1.png oder svg etc)
    // und die extension wäre dann zum bsp der dateiname (.png, .jpg oder svg usw)
    for (let i = 1; i <= count; i++) {
        imgArr.push(path + i + extention);
    }
    // zum schluss wird einfach das arr welches jetzt die bildpfade enthält zurück gegeben.
    return imgArr;
}

/**
 * This function shows The Game Over Screen
 */
function gameOver() {
    if (gameEnd) {
        gameEnd = false;
        sounds.startSong.pause();
        clearAllIntervalls();
        document.getElementById('gameOverContainer').style = 'height: unset';
        document.getElementById('gameover').style = ('background-image: url(img/gameover.jpg)');
        document.getElementById('gameover').classList.remove('d-none');
        document.getElementById('gameover').classList.add('flex');
    }
}

/**
 * This function shows the Winning Section
 */
function winGame() {
    clearAllIntervalls();
    sounds.startSong.pause();
    document.getElementById('gameOverContainer').style = 'height: 500px';
    document.getElementById('gameover').classList.remove('d-none');
    document.getElementById('win').classList.remove('d-none');
    document.getElementById('gameover').style = ('background-image: url(img/winner.webp)');
    document.getElementById('gameover').classList.add('flex');
}

/**
 * This funtion is for restarting the Game
 */
function restart() {
    sounds.bossMusic.pause();
    sounds.startSong.pause();
    document.getElementById('gameover').classList.add('d-none');
    init();
}

/**
 * This function is for going back to Startscreen
 */
function exit() {
    sounds.startSong.pause();
    sounds.bossMusic.pause();
    document.getElementById('gameover').classList.add('flex');
    document.getElementById('gameover').classList.add('d-none');
    document.getElementById('startscreen').classList.remove('d-none');
}


