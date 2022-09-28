class Character extends movableObject {

    y = 120;
    height = 150;
    speed = 7;
    world;
    // walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super();
        this.loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadAllImages();
        this.animate();
    }


    loadAllImages() {
        this.loadImages(character.IMAGES_SWIMMING);
        this.loadImages(character.ATTACK_IMAGES);
        this.loadImages(character.IMAGES_WHILENOTMOVING);
        this.loadImages(character.IMAGES_HURT);
        this.loadImages(character.IMAGES_DEAD);
        this.loadImages(character.SLAP_IMAGES);
    }


    animate() {
        this.swimDirection();

        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(character.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.playAnimation(character.IMAGES_HURT);
            } else {
                this.playMovingAnimations();
            }
        }, 300)
    }


    swimmingUp() {
        this.y -= this.speed;
    }


    swimmingDown() {
        this.y += this.speed;
    }

    swimDirection() {
        setInterval(() => {
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

        }, 1000 / 60)
    }


    playMovingAnimations() {
        //Walk Animation
        //todo in extra funktion die animationen der bewegungen mit setintervall
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(character.IMAGES_SWIMMING);
            }
        }, 300)

        if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(character.IMAGES_SWIMMING);
        }

        if (!this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.playAnimation(character.IMAGES_WHILENOTMOVING);
        }

        if (this.world.keyboard.D) {
            this.playAnimation(character.ATTACK_IMAGES);
        }

        setInterval(() => {
            if (this.world.keyboard.SPACE) {
                this.playAnimation(character.SLAP_IMAGES);
            }
        }, 1000)

    }
}