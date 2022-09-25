class Endboss extends movableObject {

    height = 400;
    width = 250;
    y = 0;
    endBossDirection = false;
    firstContact = true;


    IMAGES_INCOMING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_ATTACKING = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_INCOMING[0]);
        this.reverse();
        this.loadImages(this.IMAGES_INCOMING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 2500;
        this.animate();
        this.timeForSwimming();
    }


    animate() {
        setInterval(() => {
            if (world && world.character.x > 1800 && this.firstContact) {
                this.playAnimation(this.IMAGES_INCOMING);
                setTimeout(() => {
                    this.firstContact = false;
                }, 1200);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 200);
        // this.attack();

    }


    attack() {
        setInterval(() => {
            if (world && this.distance() < 500) {
                setInterval(() => {
                    this.playAnimation(this.IMAGES_ATTACKING);
                }, 200);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 200);
    }


    distance() {
        let distance = this.x - this.world.character.x;
        console.log(distance);
        return distance
    }


    timeForSwimming() {
        setInterval(() => {
            this.swimDirection();
        }, 200)
    }


    swimDirection() {
        if (!this.endBossDirection) {
            this.moveDown();
        } else {
            this.moveUP();
        }
    }


    reverse() {
        setInterval(() => {
            this.endBossDirection = !this.endBossDirection;
        }, 5000)
    }
}