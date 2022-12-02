class Endboss extends movableObject {
    world;
    height = 400;
    width = 250;
    y = -50;
    endBossDirection = false;
    firstContact = true;
    incoming = imagePathLoad('img/2.Enemy/3 Final Enemy/1.Introduce/', 10); // images for incoming
    swimming = imagePathLoad('img/2.Enemy/3 Final Enemy/2.floating/', 13);
    attacking = imagePathLoad('img/2.Enemy/3 Final Enemy/Attack/', 6);
    hurt = imagePathLoad('img/2.Enemy/3 Final Enemy/Hurt/', 4);
    dead = imagePathLoad('img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia ', 6);
    counter = 0;
    offsets = {
        right: 80,
        left: 0,
        top: 85,
        bottom: 60,
    };

    constructor(world) {
        super()
        this.world = world;
        this.loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.x = -800;
        this.loadAllImages();
        this.animate();
        this.attack();
        this.checkSounds();
    }


    /**
     * function for loading all available images of the Endboss
     */
    loadAllImages() {
        this.loadImages(this.incoming);
        this.loadImages(this.swimming);
        this.loadImages(this.attacking);
        this.loadImages(this.hurt);
        this.loadImages(this.dead);
    }


    /**
     * animation and timing when it should be played
     */
    animate() {
        let i = setInterval(() => {
            if (this.world.character.x > 2500 && this.firstContact && this.counter < 8) {
                this.playAnimation(this.incoming);
                this.x = 3100;
                this.counter++
                setTimeout(() => {
                    this.firstContact = false;
                }, 300);
            } else if (this.isDead()) {
                this.isBossDead(i);
            } else if (this.isHurt()) {
                this.playAnimation(this.hurt);
            } else {
                this.attack();
            }
        }, 200);
    }


    /**
     * This function is for checking if The Endboss is dead and if he is the Game will be over
     * and the Winning Screen will be shown
     */
    isBossDead(i) {
        if (this.isDead()) {
            clearInterval(i);
            this.playAnimation(this.dead)
            stopableInterval(() => {
                this.y -= 5;
            }, 150)
            setTimeout(() => {
                winningGame = true;
                winGame();
            }, 1200);
        }
    }


    /**
     * function for setting the Attack Animation
     */
    attack() {
        if (this.distanceX() < 400 && !this.firstContact) {
            this.playAnimation(this.attacking);
            if (this.x > 2100 && !this.world.character.otherDirection) {
                this.otherDirection = false;
                this.x -= 9;
                this.y += 1.5;
            } else if (this.world.character.x + this.world.character.left < this.x + this.width - this.offsets.right < 2100) {
                this.otherDirection = true
                this.x += 9;
                this.y -= 1.8;
            }
        } else {
            this.playAnimation(this.swimming);
        }
    }


    /**
     * sound settings
     */
    checkSounds() {
        stopableInterval(() => {
            if (soundOn && this.world.character.x > 2100) {
                sounds.bossMusic.play();
            } else if (!soundOn && this.world.character.x > 2100) {
                sounds.bossMusic.pause();
            }
        }, 75);
    }

    /**
     * 
     * @returns the center of the Character Image
     */
    distanceX() {
        return this.x - this.world.character.x;
    }


    /**
     * intervall for the swimming Direction
     */
    timeForSwimming() {
        stopableInterval(() => {
            this.swimDirection();
        }, 200)
    }


    /**
     * setting when the Endboss has to go up or go down
     */
    swimDirection() {
        if (!this.endBossDirection) {
            this.moveDown();
        } else {
            this.moveUP();
        }
    }


}