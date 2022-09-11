class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    bubbles = [];


    // coins = new Coin();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);

        setInterval(() => {
            this.checkForBubbles();
        }, 200)
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })

        this.isCollidingWithCoin();
        this.isCollidingWithEnemy();
    }


    checkForBubbles() {
        if (this.keyboard.D) {
            let bubble = new Bubble(this.character.x + 60, this.character.y + 80);
            this.bubbles.push(bubble);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // diese funktion cleared das Canvas immer direkt zu anfang

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backGroundObjects);
        this.addToMap(this.character);


        this.ctx.translate(-this.camera_x, 0); // Back
        // space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0); // Forward


        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.light);
        // this.addObjectsToMap(this.level.barrier);
        this.addObjectsToMap(this.bubbles);

        this.ctx.translate(-this.camera_x, 0);



        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }


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
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    isCollidingWithCoin() {
        this.level.coins.forEach((coins, index) => { // die anzahl der coins und der index wird reingegeben
            if (this.character.isColliding(coins)) {
                this.character.collectCoin();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);
                this.level.coins.splice(index, 1);
            }
        })
    }


    isCollidingWithEnemy() {
        this.bubbles.forEach((bubble, index) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bubble.isCollidingBubble(enemy)) {
                    console.log('es klappt');
                    // this.level.enemies.splice(index, 1);
                }
            })
        })
    }


}