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
                        <div class="gifDiv">
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

                    <div class="header"><h2>Enemies</h2></div>

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
        </div>
    `
}