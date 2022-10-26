/**
 * 
 * @returns Html Part with Instructions for playing The Game
 */


function createHowToPlaySection() {
    return /*html*/ `
        <div class="playSection">
            
            <div class="content ">
                <div class="howToPlay">
                    <div></div>
                    <h1>How to Play</h1>
                    
                    <div class="closingBox">
                        <img src="img/secondary-plus.svg" onclick="closeHowToPlaySection()">
                    </div>
                </div>

                <div class="movingInstructions">

                    <div class="header"><h2>Moving</h2></div>

                    <table>
                    <tr>
                        <td>
                            <div class="moveBox">
                               <span>⬆</span>
                            </div>

                            <div class="moveDirection">
                               <span>Up</span>
                            </div>
                        </td>
                    
                        <td>
                            <div class="moveBox">
                               <span>⬇</span>
                            </div>

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

                        <div class="moveDirection">
                               <span>Left</span>
                            </div>
                        </td>

                        <td>
                            <div class="moveBox">
                               <span class="rotate">⬅</span>
                            </div>

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
                        <div class="gifDiv setWidth">
                            <span class="description">Kill the Jellys with Bubbles to avoid Damage</span>
                            <img class="taskGif" src="img/2.Enemy/2 Jelly fish/Preview swim-dead.gif">
                        </div>
                    </div>
                    
                    <div class="task">
                        <div class="gifDiv">
                            <span class="description">Kill the Pufferfishes with a Slap to avoid Damage</span>
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

                    <div class="header column">
                        <h2>Enemies</h2>

                            <div class="enemyBox">
                                <div class="column">
                                    <span>Purple Jelly</span>
                                    <img class="taskImg" src="img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png">
                                </div>
                                
                                <div class="column">
                                    <span>Yellow Jelly</span>
                                    <img class="taskImg" src="img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png">
                                </div>

                                <div class="column">
                                    <span>Electric Jelly</span>
                                    <img class="taskImg" src="img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png">
                                </div>


                                <div class="column">
                                    <span>Electric Jelly</span>
                                    <img class="taskImg" src="img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 1.png">
                                </div>

                                <div class="column">
                                    <span>Pufferfish</span>
                                    <img class="taskImg" src="img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
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
            <button id="space" class="btn"><img class="space" src="img/space.png"></button>
            <button id="bubble" class="btn"><img class="bubble" src="img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"></button>
        </div>
        `
}