class Endboss extends movableObject {

    height = 400;
    width = 250;
    y = 0;
    endBossDirection = false;
    firstContact = true;




    constructor() {
        super()
        this.loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.reverse();
        this.loadAllImages();
        this.x = 2500;
        this.animate();
        this.timeForSwimming();
    }


    loadAllImages() {
        this.loadImages(endboss.INCOMING);
        this.loadImages(endboss.SWIMMING);
        this.loadImages(endboss.ATTACKING);
        this.loadImages(endboss.HURT);
        this.loadImages(endboss.DEAD);
    }


    animate() {
        let i = setInterval(() => {
            if (world && world.character.x > 1800 && this.firstContact) {
                this.playAnimation(endboss.INCOMING);
                setTimeout(() => {
                    this.firstContact = false;
                }, 900);
            } else if (world && world.level.endBoss[0].isHurt()) {
                this.playAnimation(endboss.HURT);
            } else if (this.isDead()) {
                this.playAnimation(endboss.DEAD)
                setTimeout(() => {
                    clearInterval(i);
                }, 600);
            } else {
                this.playAnimation(endboss.SWIMMING);
            }
        }, 200);
        // this.attack();

    }


    attack() {
        setInterval(() => {
            if (world && this.distance() < 500) {
                setInterval(() => {
                    this.playAnimation(endboss.ATTACKING);
                }, 200);
            } else {
                this.playAnimation(endboss.SWIMMING);
            }
        }, 200);
    }


    distance() {
        setTimeout(() => {
            if (world) {
                let distance = this.x - this.world.character.x;
                console.log(distance);
                return distance
            }
        }, 200);
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