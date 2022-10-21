class Character extends movableObject {

    y = 220;
    height = 150;
    width = 150
    speed = 10;
    offsets = {
        x: 30,
        moY: 65,
        barrierBottom: 80,
        barrierTop: 140
    }
    // noch in movableObject einfügen damit es jedes object hat

    swimming = imagePathLoad('img/1.Sharkie/3.Swim/', 6);
    attacking = imagePathLoad('img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/', 8);
    notMoving = imagePathLoad('img/1.Sharkie/1.IDLE/', 18);
    hurt = imagePathLoad('img/1.Sharkie/5.Hurt/1.Poisoned/', 4);
    hurtElectric = imagePathLoad('img/1.Sharkie/5.Hurt/2.Electric shock/', 3);
    dead = imagePathLoad('img/1.Sharkie/6.dead/1.Poisoned/', 12);
    slap = imagePathLoad('img/1.Sharkie/4.Attack/Fin slap/', 8);
    keyboard;
    world;
    // walking_sound = new Audio('audio/walking.mp3');

    constructor(world) {
        super();
        this.world = world;
        this.keyboard = world.keyboard;
        this.loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadAllImages();
        this.animate();
    }



    loadAllImages() {
        this.loadImages(this.swimming);
        this.loadImages(this.attacking);
        this.loadImages(this.notMoving);
        this.loadImages(this.hurt);
        this.loadImages(this.hurtElectric);
        this.loadImages(this.dead);
        this.loadImages(this.slap);
    }


    animate() {
        this.swimDirection();

        let id = setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.dead);
                this.world.clearAllIntervalls();
            }
            else if (this.isHurt() && !this.world.electricHit) {
                this.playAnimation(this.hurt);
            } else if (this.isHurt() && this.world.electricHit) {
                this.playAnimation(this.hurtElectric)
            } else {
                this.playMovingAnimations();
            }
        }, 200)
        allIntervalls.push(id);
    }


    swimmingUp() {
        this.y -= this.speed;
    }


    swimmingDown() {
        this.y += this.speed;
    }


    collisonCheck(side) {
        if (this.collidingBarrier(this.world.level.barrier[0]) != side && this.collidingBarrier(this.world.level.barrier[1]) != side && this.collidingBarrier(this.world.level.barrier[2]) != side && this.collidingBarrier(this.world.level.barrier[3]) != side && this.collidingBarrier(this.world.level.barrier[4]) != side) {
            return true
        }
    }


    swimDirection() {
        let id = setInterval(() => {

            if (this.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                if (this.collisonCheck('right')) {
                    this.moveRight();
                    this.otherDirection = false;
                }
            }

            if (this.keyboard.LEFT && this.x > 0) {
                if (this.collisonCheck('left')) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
            }

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

            this.world.camera_x = -this.x + 50;
            allIntervalls.push(id)
            // }
        }, 1000 / 60)

    }


    playMovingAnimations() {
        //Walk Animation
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.swimming);
        }

        if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.swimming);
        }

        if (!this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.playAnimation(this.notMoving);
        }

        if (this.world.keyboard.D) {
            this.playAnimation(this.attacking);
        }

        if (this.world.keyboard.SPACE) {
            this.playAnimation(this.slap);
        }

    }
}