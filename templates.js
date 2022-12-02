/**
 * 
 * @returns Html Part with Instructions
 */
function settingsBox() {
    return /*html*/ `
    <div class="settingsContainer">

        <div class="closingImg" id="closingImg">
            <img src="img/secondary-plus.svg" onclick="closeSettingsBox()">
        </div>

        <div class="setting mobileFullscreen">
            <span>Fullscreen</span>
            <img src="img/fullscreen.png" class="fullscreen" onclick="fullScreen()">
        </div>

        <div class="setting">
            <span>Toggle Sound</span>
            <img src="img/volume.png" id="mute" onclick="switchSound()">
        </div>

        <div class="setting">
            <span>How to play</span>
            <img src="img/information-button.png" onclick="gameInstructios()">
        </div>
        
    </div>
    `
}


/**
 * creating HTML Part with game Instructions
 */
function createGameInstructions() {
    return /*html*/`
    <div class="flex">
        <div class="playInstructions" id="playInstructions">
            <div class="headerInstructions">
                <h2>Instructions</h2>
            </div>
            <div class=" instructionBox">
                <div>

                    <div class="instruction">
                        <span>Move Sharkie</span>
                        <div class="imgInstruction">
                            <img class="move" src="img/6.Botones/Key/arrow keys.png">
                        </div>
                    </div>
                    
                    <div class="instruction">
                        <span>Shoot Bubble</span>
                        <div class="imgInstruction">
                            <img class="shoot" src="img/6.Botones/Key/D key.png">
                        </div>
                    </div>
                    
                    <div class="instruction">
                        <span>Fin Slap</span>
                        <div class="imgInstruction">
                            <div class="space">SPACE</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>


        <div class="box">
                <div class="arrowBox">
                    <img src="img/right-arrow.png" onclick="gameTarget()">
                </div>

                <div class="exitImg">
                      <img src="img/secondary-plus.svg" onclick="closeInstructions()">
                </div>
             </div>
    </div>
    `
}


/**
 * HTML part for game target section
 */
function createGameTarget() {
    return /*html*/ `
        <div class="targetBox ">
            <h2>Goal of the Game</h2>
            <span>Little Sharkie was separated from the others. Help him fight his way through the dark waters and beware of the evil jellyfish and beware of something even bigger.</span>

            <div>
                <h2>What to do</h2>
                <span>collect at least 5 coins to gain the ability to shoot bubbles. collect another 5 poison bottles so you can shoot poison bubbles to defeat the final boss. 
                jellys can be defeated with normal bubbles and pufferfishes must be hit with a fin slap.</span>
            </div>

            <div class="arrowBox top">
                <img src="img/left-arrow.png" onclick="backToInstructions()">
            </div>
        </div>
    `
}


/**
 * 
 * @returns Html Part with Moving Keys for Mobile Devices
 */
function createMobileSection() {
    return /*html*/ `
        <div class="movingKeys">
            <button id="left" class="btn"><img class="left" src="img/right-arrow.png"></button>
            <button id="right" class="btn"><img class="right" src="img/right-arrow.png"></button>
            <button id="up" class="btn"><img class="up" src="img/right-arrow.png"></button>
            <button id="down" class="btn"><img class="down" src="img/right-arrow.png"></button>
        </div>    

        <div class="attackKeys">
            <button id="space" class="btn"><img  src="img/space.png"></button>
            <button id="bubble" class="btn"><img class="bubble" src="img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"></button>
        </div>
        `
}


/**
 * creates The Html Part for the Endscreen
 */
function createEndScreen() {
    return /*html*/ `
    <div class="gameOverContainer">
        <div class="looseMessage">
            <img src="img/6.Botones/Tittles/Game Over/Recurso 11.png">
        </div>

        <div class="btnContainer">
            <div class="btnBox">
                <button class="glow-on-hover marginUnset" onclick="restart()"> Restart</button>
                <button class="exit" onclick="exit()">X</button>
            </div>
        </div>    
    </div>
    `
}


function createWinScreen() {
    return /*html*/ `
    <div class="winContainer">
        <div>
            <div class="btnBox">
                <button class="glow-on-hover marginUnset" onclick="restart()"> Restart</button>
                <button class="exit" onclick="exit()">X</button>
            </div>
        </div>    
    </div>
    `
}