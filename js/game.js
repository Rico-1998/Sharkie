let canvas;
let world;
let allIntervalls = [];
let moveMobile = false;
let mobile = /Mobi/.test(navigator.userAgent);
let keyboard;
const CANVAS_WIDTH = 800;
let startSong = new Audio('audio/1-20 Touka City.mp3');
startSong.volume = 0.05;
startSong.loop = true;
let soundOn = true;


function init() {
    checkForMobile();
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard(moveMobile);
    world = new World(canvas, keyboard, startSong);

    document.getElementById('canvas').classList.remove('d-none');
    console.log('my character is', world.character);
}


function checkForMobile() {
    // && screen.availHeight > screen.availWidth && window.matchMedia('(max-width:900px)') && window.matchMedia('(max-height:450px)')
    if (mobile) {
        moveMobile = true;
        // alert('klappt')
        document.getElementById('mobileInstructions').classList.add('mobileInstructions');
        document.getElementById('mobileInstructions').innerHTML += /*html*/ `
        <div class="movingKeys">
            <button id="left" class="btn"><img class="left" src="img/right-arrow.png"></button>
            <button id="right" class="btn"><img class="right" src="img/right-arrow.png"></button>
            <button id="up" class="btn"><img class="up" src="img/right-arrow.png"></button>
            <button id="down" class="btn"><img class="down" src="img/right-arrow.png"></button>
        </div>    

        <div class="attackKeys">
            <button id="space" class="btn"><img class="space" src="img/space.png"></button>
            <button id="bubble" class="btn"><img class="bubble" src="img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"></button>
        </div>
        `
    }
}


function stopableInterval(fn, time) {
    let idIntervall = setInterval(fn, time);
    allIntervalls.push(idIntervall);
}



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


function switchSound() {
    soundOn = !soundOn;
    if (soundOn) {
        startSong.play();
        document.getElementById('mute').src = 'img/volume.png'
    } else {
        document.getElementById('mute').src = 'img/mute.png'
        startSong.pause();
    }
}


function showGame() {
    document.getElementById('startscreen').style = 'display: none';
    document.getElementById('canvas').classList.remove('d-none');
    init();
}

function openHowToPlay() {
    document.getElementById('instructions').classList.remove('d-none');
    document.getElementById('instructions').innerHTML = '';
    document.getElementById('instructions').innerHTML += createHowToPlaySection();
}


function closeHowToPlaySection() {
    document.getElementById('instructions').classList.add('d-none');
}


function fullScreen() {
    let fullScreen = document.getElementById('canvas');
    showfullScreen(fullScreen);
}


function showfullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


// call: imagePathLoad ('img/1.Sharkie/3.Swim/', 6(für images swimming vom character))

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


