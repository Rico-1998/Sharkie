class Character extends movableObject {

    y = 120;
    height = 150;
    speed = 7;
    swimming;
    attacking;
    notMoving;
    hurt;
    dead;
    slap;
    world;
    // walking_sound = new Audio('audio/walking.mp3');

    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadAllImages();
        this.animate();
    }


    loadAllImages() {
        this.swimming = imagePathLoad('img/1.Sharkie/3.Swim/', 6);
        this.loadImages(this.swimming);
        this.attacking = imagePathLoad('img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/', 8);
        this.loadImages(this.attacking);
        this.notMoving = imagePathLoad('img/1.Sharkie/1.IDLE/', 18);
        this.loadImages(this.notMoving);
        this.hurt = imagePathLoad('img/1.Sharkie/5.Hurt/2.Electric shock/', 3);
        this.loadImages(this.hurt);
        this.dead = imagePathLoad('img/1.Sharkie/6.dead/2.Electro_shock/', 10);
        this.loadImages(this.dead);
        this.slap = imagePathLoad('img/1.Sharkie/4.Attack/Fin slap/', 8);
        this.loadImages(this.slap);
    }


    animate() {
        this.swimDirection();

        let id = setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.dead);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.hurt);
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

    swimDirection() {
        let id = setInterval(() => {
            // this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                // && !this.world.barrier.find(b => b.isColliding(this)) das ist später für die barriere
                this.moveRight();
                this.otherDirection = false;
                // this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                // this.walking_sound.play();
            }

            if (this.world.keyboard.UP && this.y > -70) {
                this.swimmingUp();
            }

            if (this.world.keyboard.DOWN && this.y < 400) {
                this.swimmingDown();
            }

            this.world.camera_x = -this.x + 50;
            allIntervalls.push(id)
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