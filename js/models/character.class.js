class Character extends movableObject {

    y = 220;
    height = 150;
    width = 150
    speed = 5;
    offsets = {
        right: 10,
        left: 0,
        top: 60,
        bottom: 40,
        barrierBottom: 80,
        barrierTop: 140
    };
    time = new Date().getTime();
    swimming = imagePathLoad('img/1.Sharkie/3.Swim/', 6);
    attacking = imagePathLoad('img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/', 8);
    notMoving = imagePathLoad('img/1.Sharkie/1.IDLE/', 18);
    sleeping = imagePathLoad('img/1.Sharkie/2.Long_IDLE/i', 14);
    hurt = imagePathLoad('img/1.Sharkie/5.Hurt/1.Poisoned/', 4);
    hurtElectric = imagePathLoad('img/1.Sharkie/5.Hurt/2.Electric shock/', 3);
    dead = imagePathLoad('img/1.Sharkie/6.dead/1.Poisoned/', 12);
    slap = imagePathLoad('img/1.Sharkie/4.Attack/Fin slap/', 8);
    keyboard;
    world;
    timeForAttack = 0;


    constructor(world) {
        super();
        this.world = world;
        this.keyboard = world.keyboard;
        this.loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadAllImages();
        this.animate();
    }

    /**
     * this function loads all available images of the characer
     */
    loadAllImages() {
        this.loadImages(this.swimming);
        this.loadImages(this.attacking);
        this.loadImages(this.notMoving);
        this.loadImages(this.sleeping);
        this.loadImages(this.hurt);
        this.loadImages(this.hurtElectric);
        this.loadImages(this.dead);
        this.loadImages(this.slap);
    }


    /**
     * calls 2 functions which were setting the swimming Direction and checking if the character gets hurt
     */
    animate() {
        this.swimDirection();
        this.checkIfCharacterIsHurt();
    }


    /**
     * checks if the character gets hurt by an enemy 
     */
    checkIfCharacterIsHurt() {
        stopableInterval(() => {
            this.checkForCharacterDeath();
            if (this.isHurt() && !this.world.electricHit) {
                this.playAnimation(this.hurt);
                sounds.hitSound.play();
            } else if (this.isHurt() && this.world.electricHit) {
                this.playAnimation(this.hurtElectric)
            } else {
                this.playMovingAnimations();
            }
        }, 250)
    }


    /**
     * checks if character is dead and if he is dead the game will be over
     */
    checkForCharacterDeath() {
        if (this.isDead()) {
            this.playAnimation(this.dead);
            setTimeout(() => {
                gameEnd = true;
                gameOver();
            }, 2300);
        }
    }

    /**
     * function for moving up
     */
    swimmingUp() {
        this.y -= this.speed;
    }


    /**
     * function for moving down
     */
    swimmingDown() {
        this.y += this.speed;
    }


    /**
     * 
     * @param {the side which collision has to be checked} side 
     * @returns true if collision is happening
     */
    collisonCheck(side) {
        if (this.collidingBarrier(this.world.level.barrier[0]) != side && this.collidingBarrier(this.world.level.barrier[1]) != side && this.collidingBarrier(this.world.level.barrier[2]) != side && this.collidingBarrier(this.world.level.barrier[3]) != side && this.collidingBarrier(this.world.level.barrier[4]) != side) {
            return true
        }
    }


    /**
     * function for checking all Collisions
     */
    swimDirection() {
        stopableInterval(() => {
            this.checkCollisionwhileMovingSide();
            this.checkCollisionwhileMovingVertical();
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60)

    }


    /**
     * checking Collisions Vertical
     */
    checkCollisionwhileMovingVertical() {
        if (this.keyboard.UP && this.y > -70) {
            if (this.collisonCheck('top')) {
                this.moveUP();
            }
        }

        if (this.keyboard.DOWN && this.y < 300) {
            if (this.collisonCheck('bottom')) {
                this.moveDown();
            }
        }
    }


    /**
     * checking Collisions horizontal
     */
    checkCollisionwhileMovingSide() {
        if (this.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            if (this.collisonCheck('right')) {
                this.moveRight();
                this.otherDirection = false;
            }
        }

        if (this.keyboard.LEFT && this.x > -500) {
            if (this.collisonCheck('left')) {
                this.moveLeft();
                this.otherDirection = true;
            }
        }
    }


    /**
     * checking if no key is pressed and then play a sleeping animation
     */
    playMovingAnimations() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.swimming);
            this.time = new Date().getTime();
            sounds.swimSound.play();
        } else {
            sounds.swimSound.pause();
        }
        this.fallindAsleep();
        this.attackEnemy();
    }


    /**
     * animation for attacking
     */
    attackEnemy() {
        if (this.world.keyboard.D && this.timeForAttack < 8) {
            this.playAnimation(this.attacking);
            this.timeForAttack++;
            sounds.soundWhileShoot.play();
        } else {
            this.timeForAttack = 0;
            sounds.soundWhileShoot.pause();
            sounds.soundWhileShoot.load();
        }
        if (this.world.keyboard.SPACE) {
            this.playAnimation(this.slap);
        }
    }


    /**
     * creating the Sleeping Function
     */
    fallindAsleep() {
        if (!this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.D && !this.world.keyboard.SPACE) {
            this.playAnimation(this.notMoving);
            let timePass = new Date().getTime() - this.time;
            if (timePass > 8000) {
                this.playAnimation(this.sleeping);
                if (this.y > 300) {
                    this.y += 0;
                } else {
                    this.y += 4;
                }
            }
        }
    }
}