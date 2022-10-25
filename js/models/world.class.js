class World {
    gameStart = true;
    character;
    level;
    levelNr = 1;
    canvas;
    mobile;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar('health', 0);
    statusBarCoin = new StatusBar('coin', 40);
    statusBarPoison = new StatusBar('poison', 80);
    bubbles = [];
    timeForAttack = true;
    electricHit = false;
    woSounds = {
        jellyHit: new Audio('audio/bubble-pop.mp3'),
    };



    constructor(canvas, keyboard, startsong, mobile) {
        this.mobile = mobile;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character(this);
        this.level = new Level(this);
        this.draw();
        this.run();
        this.attackTime();
        // startSong.play();
    }


    clearAllIntervalls() {
        for (let i = 0; i < allIntervalls.length; i++) {
            const clearableIntervalls = allIntervalls[i];
            clearInterval(clearableIntervalls)
            // console.log(clearableIntervalls)
        }
    }


    run() {
        stopableInterval(() => {
            this.checkCollisions();

        }, 125);
        // muss noch geändert werden damit der character nicht so schnell stirbt auf 200ms und this.attack jelly muss in eine andere funktion die alle 50 ms abgefragt wird 

        stopableInterval(() => {
            this.checkForBubbles();
            this.checkEnemyCollisions();
        }, 200)
    }


    checkCollisions() {
        this.isCollidingWithCoin();
        this.iscollidingWithPoison();
        this.attackJelly('purple');
        this.attackJelly('yellow');
        this.attackJelly('electric');
        this.attackPuffer();
        this.attackEndboss();
    }


    checkForBubbles() {
        // if (this.statusBarCoin.percentage == 100) {
        if (this.keyboard.D && this.timeForAttack) {
            let bubble = new Bubble(this.character.x + 60, this.character.y + 80);
            this.bubbles.push(bubble);
            this.timeForAttack = false;
        }
        // }
    }


    attackTime() {
        stopableInterval(() => {
            this.timeForAttack = true;
        }, 1000)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // diese funktion cleared das Canvas immer direkt zu anfang
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backGroundObjects);
        this.addToMap(this.character);


        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.barrier);
        this.addObjectsToMap(this.bubbles);

        this.allStatusBars()


        this.ctx.translate(-this.camera_x, 0);


        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    allStatusBars() {
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarPoison);
        this.ctx.translate(this.camera_x, 0); // Forward
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    };


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


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };


    isCollidingWithCoin() {
        this.level.coins.forEach((coin, index) => { // die anzahl der coins und der index wird reingegeben
            if (this.character.isColliding(coin, index)) {
                this.character.collectCoin();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);
                this.level.coins[index].collected = true;
                setTimeout(() => {
                    this.level.coins.splice(index, 1);
                }, 70);
            }
        })
    };


    iscollidingWithPoison() {
        this.level.poison.forEach((poison, index) => { // die anzahl der coins und der index wird reingegeben
            if (this.character.isColliding(poison)) {
                this.character.collectPoison();
                this.statusBarPoison.setPercentage(this.character.collectedPoisonBottle);
                this.level.poison[index].collected = true;
                setTimeout(() => {
                    this.level.poison.splice(index, 1);
                }, 70);
            }
        })
    }


    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index) && enemy.type != 'electric') {
                this.setDamage(2, false);
            } else if (this.character.isColliding(enemy, index) && enemy.type == 'electric') {
                this.setDamage(5, true);
            }
        })
        this.endbossCollision();
    }


    endbossCollision() {
        if (this.character.isColliding(this.level.endBoss[0])) {
            this.setDamage(8, false);
        }
    }


    setDamage(nr, boolean) {
        this.character.hit(nr);
        this.statusBar.setPercentage(this.character.energy);
        this.electricHit = boolean;
    }


    attackJelly(fish) {
        this.bubbles.forEach((bubble, indexBubble) => {
            this.level.enemies.forEach((enemy, indexEnemy) => {
                if (bubble.isColliding(enemy, indexEnemy) && this.level.enemies[indexEnemy].type === fish) {
                    this.woSounds.jellyHit.play();
                    this.woSounds.jellyHit.volume = 0.1;
                    this.bubbles.splice(indexBubble, 1);
                    enemy.jellyfishDead();
                    this.spliceOutofArray(this.level.enemies, indexEnemy, 2000);
                }
            })
        })
    };


    attackPuffer() {
        // this.bubbles.forEach((bubble, indexBubble) => {
        this.level.enemies.forEach((enemy, index) => {
            if (this.level.enemies[index].type == 'greenPuffer') {
                if (this.character.isCollidingPuffer(this.level.enemies[index]) && this.keyboard.SPACE && !this.character.isColliding(this.level.enemies[index])) {
                    this.level.enemies[index].jellyfishDead();
                }
            }
            // else if (this.keyboard.D) {
            //     this.bubbles.forEach((bubble, indexBubble) => {
            //         if (bubble.isColliding(enemy)) {
            //             this.bubbles.splice(indexBubble, 1);
            //         }
            //     })
            // }

        })

    };


    attackEndboss() {
        let boss = this.level.endBoss[0]

        this.bubbles.forEach((bubble, indexBubble) => {
            if (bubble.isColliding(boss) && this.statusBarPoison.percentage == 100) {
                boss.hit(10);
                this.spliceOutofArray(this.bubbles, indexBubble, 0)
                // this.bubbles.splice(indexBubble, 1);
            }
        });
    }


    spliceOutofArray(array, i, time) {
        setTimeout(() => {
            array.splice(i, 1);
        }, time);
    }


    endBossgetHurt() {
        return this.level.endBoss[0].energy -= 10;
    }
}