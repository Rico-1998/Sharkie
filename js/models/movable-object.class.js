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


    /**
     * animation for applying Gravity
     */
    applyGravity() {
        stopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    /**
     * 
     * @returns the Center in X of the Character
     */
    centerX() {
        return this.x + this.width / 2;
    }


    /**
     * 
     * @returns the Center In Y of the Character
     */
    centerY() {
        return this.y + this.height / 2;
    }


    /**
     * 
     * @param {amount of damage that the character should get from enemys} damage 
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * 
     * @returns the time of the lasthit the character getss
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in milliseconds;
        timePassed = timePassed / 1000; // Difference in seconds
        return timePassed < 0.9;
    }


    /**
     * 
     * @returns the energy for dead animation
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * 
     * @returns energy for the Jellyfish dead function
     */
    jellyfishDead() {
        return this.energy = 0;
    }


    /**
     * 
     * @returns true if the bubble is above ground and else an y parameter
     */
    isAboveGround() {
        if (this instanceof Bubble) { // throwable objects should always fall.
            return true
        } else {
            return this.y < 300
        }
    }


    /**
     * 
     * @param {the object which has to be checked if it is colliding with a Barrier} collidingObj 
     * @returns the Side where a Collision was detected
     */
    collidingBarrier(collidingObj) {
        if (this.isColliding(collidingObj)) {
            // Calculate the distance between centers
            const diffX = this.centerX() - (collidingObj.centerX());
            const diffY = this.centerY() - (collidingObj.centerY());
            // Calculate the minimum distance to separate along X and Y
            let minDistX = (this.width / 2) + (collidingObj.width / 2),
                minDistY = (this.height / 4) + (collidingObj.height / 2);
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


    /**
     * 
     * @param {the Object which should be checked if a collision happens} mo 
     * @returns true if a collision is detected on each side
     */
    isColliding(mo) {
        return this.x + this.width - this.offsets.right > mo.x + mo.offsets.left &&    //   right > left =>   
            this.y + this.height - this.offsets.bottom > mo.y + mo.offsets.top &&     //    top > bottom =>   
            this.x + this.offsets.left < mo.x + mo.width - mo.offsets.right &&       //     left > right =>   
            this.y + this.offsets.top < mo.y + mo.height - mo.offsets.bottom;       //      bottom > top =>   
    }


    /**
     * 
     * @param {the pufferfish} puffer 
     * @returns true if the calculation is right
     */
    isCollidingPuffer(puffer) {
        return this.x + this.width - puffer.x + puffer.width > 60 &&
            this.y + this.height - puffer.y + puffer.height > 50 &&
            this.y - puffer.y + puffer.height < 50
    }


    /**
     * setting the moving Right amount in x
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * setting the moving Left amount in x
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * 
     * getting through img array and in last place starting again on zero
     * @param {Array of Images} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 
        let path = images[i];
        this.img = this.imageCache[path]; // die variable img aus der movable object klasse entspricht dem bild-pfad aus dem json images walking;
        this.currentImage++;

    }


    /**
     * setting the amount when a coin is collected
     */
    collectCoin() {
        this.collectedCoins += 20;
        if (this.collectedCoins > 100) {
            this.collectedCoins = 100;
        } else {
            this.actualCoin = new Date().getTime();
        }
    }


    /**
     * setting the Amount when a poison Bottle is collected
     */
    collectPoison() {
        this.collectedPoisonBottle += 20;
        if (this.collectedPoisonBottle > 100) {
            this.collectedPoisonBottle = 100;
        } else {
            this.actualPoisonBottle = new Date().getTime();
        }
    }


    /**
     * 
     * @param {time when the direction of the object should be changed} time 
     */
    reverse(time) {
        stopableInterval(() => {
            this.otherDirection = !this.otherDirection;
        }, time);
    }


    /**
     * checking by direction when the object should be going down or up
     */
    swimDirection() {
        if (!this.otherDirection) {
            this.moveDown();
        } else {
            this.moveUP();
        }

    }


    /**
     * function which added an random amount to y to go down
     */
    moveDown() {
        this.y += this.speed + Math.random() * 5;
        // this.speedY += this.acceleration;
    }


    /**
     * function which added an random amount to y to go up
     */
    moveUP() {
        this.y -= this.speed + Math.random() * 5;
        // this.speedY -= this.acceleration;
    }

}

