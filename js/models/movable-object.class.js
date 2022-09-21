class movableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectedCoins = 0;
    actualCoin = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in milliseconds;
        timePassed = timePassed / 1000; // Difference in seconds
        return timePassed < 0.5;
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


    // character.isColliding(Jellyfish);
    isColliding(mo) {
        return this.x - 30 + this.width > mo.x &&
            this.y + this.height > mo.y + 30 &&
            this.x < mo.x + 30 &&
            this.y + 65 < mo.y + mo.height;
    }


    isCollidingBubble(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x &&

            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height;
    }


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
            console.log(collectedCoin);
        } else {
            this.actualCoin = new Date().getTime();
        }
    }


    reverse(time) {
        setInterval(() => {
            this.otherDirection = !this.otherDirection;
        }, time)
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

