class movableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectedPoisonBottle = 0;
    actualPoisonBottle = 0;
    collectedCoins = 0;
    actualCoin = 0;
    offsets = {
        x: 0,
        moY: 0,
        barrierBottom: 0,
        barrierTop: 0
    }



    applyGravity() {
        stopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    centerX() {
        return this.x + this.width / 2;
    }


    centerY() {
        return this.y + this.height / 2;
    }


    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in milliseconds;
        timePassed = timePassed / 1000; // Difference in seconds
        return timePassed < 1.0;
    }


    isDead() {
        return this.energy == 0;
    }


    jellyfishDead() {
        return this.energy = 0;
    }


    isAboveGround() {
        if (this instanceof Bubble) { // throwable objects should always fall.
            return true
        } else {
            return this.y < 180
        }
    }



    collidingBarrier(collidingObj) {
        if (this.isCollidingXandY(collidingObj)) {
            // Calculate the distance between centers
            const diffX = this.centerX() - (collidingObj.centerX());
            const diffY = this.centerY() - (collidingObj.centerY());
            // Calculate the minimum distance to separate along X and Y
            let minDistX = (this.width / 2) + (collidingObj.width / 2),
                minDistY = (this.height / 50) + (collidingObj.height / 2);
            // Calculate the depth of collision for both the X and Y axis
            let depthX = diffX > 0 ? minDistX - diffX : -minDistX - diffX,
                depthY = diffY > 0 ? minDistY - diffY : -minDistY - diffY;

            // if(diffX > 0) {
            //     depthX =  minDistX - diffX;
            // } else {
            //     depthX = -minDistX - diffX;
            // } zeile 210-214 ist das gleiche wie in zeile 208; (ternary operator so heisst diese schreibweise)
            // so eine schreibweise nur für sehr einfache if abfragen die nur maximal 2 möglichkeiten zulassen bsp. boolean und für variablen zuweisung
            // ? bedeutet then und also wenn die if bedingung true ist dann soll er was machen und : bedeutet else


            // having the depth, pick the smaller depth and move along that axis
            if (depthX != 0 && depthY != 0) {
                // Collision along the X-axis...
                if (Math.abs(depthX) < Math.abs(depthY)) {
                    if (depthX > 0) return 'left';
                    return 'right';
                    // Collision along the Y-axis...    
                } else {
                    if (depthY > 0) return 'top';
                    return 'bottom';
                }
            }
        } else {
            return null;
        }

    }


    // character.isColliding(Jellyfish);
    isColliding(mo) {
        return this.x - this.offsets.x + this.width > mo.x &&
            this.y + this.height - this.offsets.x > mo.y &&
            this.x < mo.x + this.offsets.x &&
            this.y + this.offsets.moY < mo.y + mo.height - mo.offsets.bottom;
    }


    isCollidingXandY(mo) {
        return (
            this.x - this.offsets.x + this.width > mo.x && // rechts nach links
            this.x + this.offsets.x < mo.x + mo.width && // links nach rechts

            this.y + this.height - this.offsets.barrierBottom > mo.y && // oben nach unten
            this.y + this.offsets.barrierTop < mo.y + mo.height // unten nach oben
        );
    }

    isCollidingPuffer(puffer) {
        return this.x + this.width - puffer.x + puffer.width > 60 &&
            this.y + this.height - puffer.y + puffer.height > 50 &&
            this.y - puffer.y + puffer.height < 50
    }


    // isCollidingBubble(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.x < mo.x &&

    //         this.y + this.height > mo.y &&
    //         this.y < mo.y + mo.height;
    // }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 
        let path = images[i];
        this.img = this.imageCache[path]; // die variable img aus der movable object klasse entspricht dem bild-pfad aus dem json images walking;
        this.currentImage++;

    }


    collectCoin() {
        this.collectedCoins += 20;
        if (this.collectedCoins > 100) {
            this.collectedCoins = 100;
        } else {
            this.actualCoin = new Date().getTime();
        }
    }

    collectPoison() {
        this.collectedPoisonBottle += 20;
        if (this.collectedPoisonBottle > 100) {
            this.collectedPoisonBottle = 100;
        } else {
            this.actualPoisonBottle = new Date().getTime();
        }
    }

    reverse(time) {
        stopableInterval(() => {
            this.otherDirection = !this.otherDirection;
        }, time);
    }


    swimDirection() {
        if (!this.otherDirection) {
            this.moveDown();
        } else {
            this.moveUP();
        }

    }

    moveDown() {
        this.y += this.speed + Math.random() * 5;
        // this.speedY += this.acceleration;
    }


    moveUP() {
        this.y -= this.speed + Math.random() * 5;
        // this.speedY -= this.acceleration;
    }

}

