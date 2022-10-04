let canvas;
let world;
let allIntervalls = [];
let keyboard = new Keyboard();
const CANVAS_WIDTH = 800;




function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    document.getElementById('canvas').classList.remove('d-none');
    document.body.classList.add('background');


    console.log('my character is', world.character);
}


function showGame() {
    document.getElementById('startscreen').style = 'display: none';
    document.getElementById('canvas').classList.remove('d-none');
    document.body.classList.add('background');
    init();
}

function openHowToPlay() {
    document.getElementById('instructions').innerHTML = '';
    document.getElementById('instructions').innerHTML += createHowToPlaySection();
}


function createHowToPlaySection() {
    return /*html*/ `
        <div class="playSection">
            <div class="content ">
                <h1>How to Play</h1>

                <div>
                    
                </div>
            </div>
        </div>
    `
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


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});