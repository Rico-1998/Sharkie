let canvas;
let world;
let allIntervalls = [];
let keyboard = new Keyboard();
const CANVAS_WIDTH = 800;




function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // if(window.innerHeight > window.innerWidth){
    //     alert("Please use Landscape!");
    // }
    document.getElementById('canvas').classList.remove('d-none');

    console.log('my character is', world.character);
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


function createHowToPlaySection() {
    return /*html*/ `
        <div class="playSection">
            <div class="closingBox">
                <img src="img/secondary-plus.svg" onclick="closeHowToPlaySection()">
            </div>

            <div class="content ">
                <div class="header">
                    <h1>How to Play</h1>
                </div>

                <div class="movingInstructions">

                    <div class="header"><h2>Moving</h2></div>

                    <table>
                    <tr>
                        <td>
                            <div class="moveBox">
                               <span>⬆</span>
                            </div>
                        <!-- </td> -->

                        <!-- <td> -->
                            <div class="moveDirection">
                               <span>Up</span>
                            </div>
                        </td>
                    
                        <td>
                            <div class="moveBox">
                               <span>⬇</span>
                            </div>
                        <!-- </td> -->

                        <!-- <td> -->
                        <div class="moveDirection">
                               <span>Down</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="moveBox">
                               <span>⬅</span>
                            </div>
                        <!-- </td> -->

                        <!-- <td> -->
                        <div class="moveDirection">
                               <span>Left</span>
                            </div>
                        </td>

                        <td>
                            <div class="moveBox">
                               <span class="right">⬅</span>
                            </div>
                        <!-- </td> -->

                        <!-- <td> -->
                            <div class="moveDirection">
                               <span>Right</span>
                            </div>
                        </td>
                    </tr>

                    <tr class="attackContainer">
                        <td>
                        <div class="spaceBox">
                            <span>Space</span>
                        </div>

                        <div class="moveDirection">
                            <span>Slap Attack</span>
                        </div>
                        </td>

                        <td>
                        <div class="spaceBox ">
                            <span>D</span>
                        </div>

                        <div class="moveDirection">
                            <span>Bubble Attack</span>
                        </div>
                        </td>
                    </tr>
                    </table>
                </div>


                <div class="tasks">
                    <div class="header"><h2>Your Tasks</h2></div>

                    <div class="task">
                        <div>
                            <span class="description">Collect at least 5 Coins to be able to shoot a Simple Bubble</span>
                            <img class="taskImg" src="img/4. Marcadores/1. Coins/1.png">
                        </div>
                    </div>

                    <div class="task">
                        <div>
                            <span class="description">Collect 5 Poison Bottles to be able to shoot a Poison Bubble</span>
                            <img class="taskImg" src="img/4. Marcadores/Posiขn/Animada/1.png">
                        </div>
                    </div>

                    <div class="task">
                        <div class="gifDiv">
                            <span class="description">Kill the Jellys with Bubbles to avoid Damage</span>
                            <img class="taskGif" src="img/2.Enemy/2 Jelly fish/Preview swim-dead.gif">
                        </div>
                    </div>
                    
                    <div class="task">
                        <div class="gifDiv">
                            <span class="description">Kill the Pufferfishes a Slap to avoid Damage</span>
                            <img class="taskGif" src="img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead 1 proposal.gif">
                        </div>
                    </div>

                    <div class="task">
                        <div class="gifDiv">
                            <span class="description">Last but not least Kill The Endboss to Win the Game</span>
                            <img class="endbossImg" src="img/2.Enemy/3 Final Enemy/1.Introduce/10.png">
                        </div>
                    </div>

                    <div class="enemyContainer">
                        <div class="enemyBox">
                            <img class="taskImg" src="img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png">
                            <img class="taskImg" src="img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png">
                            <img class="taskImg" src="img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png">
                            <img class="taskImg" src="img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 1.png">
                            <img class="taskImg" src="img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png">
                        </div>
                    </div>
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