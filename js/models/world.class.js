class World {
    // character = new Character();
    // this ist das schlüsselwort für die aktuelle instanz was bedeutet wenn man this als parameter in eine klassse übergibt hat diese klassse zugriff alle methoden und eigenschaften 
    character;
    level;
    levelNr = 1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarPoison = new StatusBarPoison();
    bubbles = [];
    timeForAttack = true;




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character(this);
        this.level = new Level(this);
        this.draw();
        this.run();
        this.attackTime();
    }


    clearAllIntervalls() {
        for (let i = 0; i < allIntervalls.length; i++) {
            const clearableIntervalls = allIntervalls[i];
            clearInterval(clearableIntervalls)
            // console.log(clearableIntervalls)
        }
    }



    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 125);
        // muss noch geändert werden damit der character nicht so schnell stirbt auf 200ms und this.attack jelly muss in eine andere funktion die alle 50 ms abgefragt wird 

        setInterval(() => {
            this.checkForBubbles();
        }, 200)

        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit(5);
                    this.statusBar.setPercentage(this.character.energy);
                }
            })
        }, 200);
    }


    checkCollisions() {
        this.isCollidingWithCoin();
        this.attackJelly('purple');
        this.attackJelly('yellow');
        this.attackPuffer();
        this.attackEndboss();
    }


    checkForBubbles() {
        if (this.statusBarCoin.percentage == 100) {
            if (this.keyboard.D && this.timeForAttack) {
                let bubble = new Bubble(this.character.x + 60, this.character.y + 80);
                this.bubbles.push(bubble);
                this.timeForAttack = false;
            }
        }
    }


    attackTime() {
        setInterval(() => {
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
        // space for fixed objects
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
        mo.drawFrame(this.ctx);
        mo.drawFrameCharacter(this.ctx);
        mo.drawFrameEndboss(this.ctx);
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
    };


    attackJelly(fish) {
        this.bubbles.forEach((bubble, indexBubble) => {
            this.level.enemies.forEach((enemy, indexEnemy) => {
                if (bubble.isCollidingBubble(enemy, indexEnemy) && this.level.enemies[indexEnemy].type === fish) {
                    this.bubbles.splice(indexBubble, 1);
                    enemy.jellyfishDead();
                    setTimeout(() => {
                        this.level.enemies.splice(indexEnemy, 1);
                    }, 2000);
                }
            })
        })
    };


    attackPuffer() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index) && this.level.enemies[index].type == 'greenPuffer' && this.keyboard.SPACE) {
                enemy.jellyfishDead();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                }, 2000);
            }
        })
    };


    attackEndboss() {
        let boss = this.level.endBoss[0]

        this.bubbles.forEach((bubble, indexBubble) => {
            if (bubble.isColliding(boss) && this.statusBarPoison.percentage == 100) {
                boss.hit(10);
                this.bubbles.splice(indexBubble, 1);
            }
        });
    }


    endBossgetHurt() {
        return this.level.endBoss[0].energy -= 10;
    }
}