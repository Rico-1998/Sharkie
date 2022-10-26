class World {
    gameStart = true;
    character;
    level;
    levelNr = 1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar('health', 0, this);
    statusBarCoin = new StatusBar('coin', 40, this);
    statusBarPoison = new StatusBar('poison', 80, this);
    statusBarBoss = new StatusBar('boss', -50, this);
    bubbles = [];
    timeForAttack = true;
    electricHit = false;
    woSounds = {
    };



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        // this.clearCanvas();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character(this);
        this.level = new Level(this);
        this.draw();
        this.run();
        this.attackTime();
        sounds.startSong.play();
    }


    /**
     * this function Clears the whole Canvas.
     * 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * main function that checks all collisions etc
     */
    run() {
        stopableInterval(() => {
            this.checkCollisions();
        }, 150);

        stopableInterval(() => {
            this.checkForBubbles();
            this.checkEnemyCollisions();
        }, 200)
    }


    /**
     * checking all Collisions with every Enemy or Barrier
     */
    checkCollisions() {
        this.isCollidingWithCoin();
        this.iscollidingWithPoison();
        this.attackJelly('purple');
        this.attackJelly('yellow');
        this.attackJelly('electric');
        this.attackJelly('electricPink');
        this.attackPuffer();
        this.attackEndboss();
        this.checkToSpliceBubble();
    }

    /**
     * setting a bubble and checking if percentage is = 100 for changing into green bubble
     */
    checkForBubbles() {
        if (this.statusBarCoin.percentage == 100) {
            if (this.keyboard.D && this.timeForAttack) {
                let bubble = new Bubble(this.character.x + 60, this.character.y + 80);
                this.bubbles.push(bubble);
                this.timeForAttack = false;
            }
        }
    }


    /**
     * setting a variable of true for the attacking animation
     */
    attackTime() {
        stopableInterval(() => {
            this.timeForAttack = true;
        }, 1000)
    }


    /**
     * drawing all elements into the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // diese funktion cleared das Canvas immer direkt zu anfang
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backGroundObjects);
        this.allObjects();
        this.allStatusBars()
        this.ctx.translate(-this.camera_x, 0);
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    /**
     * collection of objects which has to be shown in canvas
     */
    allObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.barrier);
        this.addObjectsToMap(this.bubbles);
    }


    /**
     * collection of statusbars which has to be shown in canvas
     */
    allStatusBars() {
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0); // Forward
    }


    /**
     * 
     * @param {object which has to be drawn in canvas} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    };


    /**
     * 
     * @param {object which has to be added to the world} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawFrameCharacter(this.ctx);
        // mo.drawFrameEndboss(this.ctx);
        // mo.drawFrameBarrier(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };


    /**
     * 
     * @param {object which side has to be flipped if it moves in the otherdirection} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    /**
     * 
     * @param {object for cancelling the flip effect} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };


    /**
     * collision Detection for Coins
     */
    isCollidingWithCoin() {
        this.level.coins.forEach((coin, index) => { // die anzahl der coins und der index wird reingegeben
            if (this.character.isColliding(coin, index)) {
                this.character.collectCoin();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);
                this.level.coins[index].collected = true;
                sounds.collectCoin.play();
                setTimeout(() => {
                    this.level.coins.splice(index, 1);
                }, 70);
            }
        })
    };


    /**
    * collision Detection for Poison
    */
    iscollidingWithPoison() {
        this.level.poison.forEach((poison, index) => { // die anzahl der coins und der index wird reingegeben
            if (this.character.isColliding(poison)) {
                this.character.collectPoison();
                this.statusBarPoison.setPercentage(this.character.collectedPoisonBottle);
                this.level.poison[index].collected = true;
                sounds.collectPoison.play();
                setTimeout(() => {
                    this.level.poison.splice(index, 1);
                }, 70);
            }
        })
    }


    /**
    * collision Detection for all Jellyfishes
    */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index) && enemy.type != 'electric' && this.character.isColliding(enemy, index) && enemy.type != 'electricPink') {
                this.setDamage(2, false);
            }
            else if (this.character.isColliding(enemy, index) && enemy.type == 'electric' || this.character.isColliding(enemy, index) && enemy.type == 'electricPink') {
                this.setDamage(5, true);
            }
        })
        this.endbossCollision();
    }


    /**
    * collision Detection for Endboss
    */
    endbossCollision() {
        if (this.character.isColliding(this.level.endBoss[0])) {
            this.setDamage(8, false);
        }
    }


    /**
    * setting Damage for the Health StatusBar
    */
    setDamage(nr, boolean) {
        this.character.hit(nr);
        this.statusBar.setPercentage(this.character.energy);
        this.electricHit = boolean;
    }


    /**
     * 
     * @param {jellyfish which has to be attacked} fish 
     */
    attackJelly(fish) {
        this.bubbles.forEach((bubble, indexBubble) => {
            this.level.enemies.forEach((enemy, indexEnemy) => {
                if (bubble.isColliding(enemy, indexEnemy) && this.level.enemies[indexEnemy].type === fish) {
                    sounds.jellyHit.play();
                    this.bubbles.splice(indexBubble, 1);
                    enemy.jellyfishDead();
                    this.spliceOutofArray(this.level.enemies, indexEnemy, 2000);
                }
            })
        })
    };


    /**
     * checking if a pufferfish is hit by a slap
     */
    attackPuffer() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.level.enemies[index].type == 'Puffer') {
                if (this.character.isCollidingPuffer(this.level.enemies[index]) && this.keyboard.SPACE && !this.character.isColliding(this.level.enemies[index])) {
                    sounds.slap.play();
                    this.level.enemies[index].jellyfishDead();
                }
            }
        })
    };


    /**
     * splicing bubble when it collides with a barrier or a pufferfish
     */
    checkToSpliceBubble() {
        this.bubbles.forEach((bubble, indexBubble) => {
            this.level.barrier.forEach((barrier) => {
                this.level.enemies.forEach((enemy) => {
                    if (bubble.isColliding(enemy) && enemy.type == 'Puffer' || bubble.isColliding(barrier)) {
                        sounds.jellyHit.play();
                        this.bubbles.splice(indexBubble, 1);
                    }
                })
            })
        })
    }


    /**
     * checking if the endboss gets hit and setting the amount of damage he will gets
     */
    attackEndboss() {
        let boss = this.level.endBoss[0]
        this.bubbles.forEach((bubble, indexBubble) => {
            if (bubble.isColliding(boss) && this.statusBarPoison.percentage == 100) {
                boss.hit(10);
                sounds.bossHit.play();
                this.spliceOutofArray(this.bubbles, indexBubble, 0)
                this.statusBarBoss.setPercentage(boss.energy);
            }
        });
    }


    /**
     * 
     * @param {enemy Array} array 
     * @param {index } i 
     * @param {time when it should be spliced} time 
     */
    spliceOutofArray(array, i, time) {
        setTimeout(() => {
            array.splice(i, 1);
        }, time);
    }


    /**
     * 
     * @returns energy of endboss -10
     */
    endBossgetHurt() {
        return this.level.endBoss[0].energy -= 10;
    }
}