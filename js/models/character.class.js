class Character extends movableObject {

    y = 120;
    height = 150;
    speed = 7;
    swimming = imagePathLoad('img/1.Sharkie/3.Swim/', 6);
    attacking = imagePathLoad('img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/', 8);
    notMoving = imagePathLoad('img/1.Sharkie/1.IDLE/', 18);
    hurt = imagePathLoad('img/1.Sharkie/5.Hurt/1.Poisoned/', 4);
    dead = imagePathLoad('img/1.Sharkie/6.dead/1.Poisoned/', 12);
    slap = imagePathLoad('img/1.Sharkie/4.Attack/Fin slap/', 8);
    world;
    // walking_sound = new Audio('audio/walking.mp3');

    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadAllImages();
        this.animate();
        setTimeout(() => {
        }, 200);
    }


    loadAllImages() {
        this.loadImages(this.swimming);
        this.loadImages(this.attacking);
        this.loadImages(this.notMoving);
        this.loadImages(this.hurt);
        this.loadImages(this.dead);
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
                // wenn nicht kollidiert dann die nächsten 2zeilen ausführen sonst nicht
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