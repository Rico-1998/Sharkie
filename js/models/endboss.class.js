class Endboss extends movableObject {
    world;
    height = 400;
    width = 250;
    y = 0;
    endBossDirection = false;
    firstContact = true;
    incoming; // am besten auch immer schreiben arr wenn es ein array ist für die bessere identifikation der variable
    swimming;



    constructor(world) {
        super()
        this.world = world;
        this.loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.reverse();
        this.loadAllImages();
        this.x = 2500;
        this.animate();
        this.timeForSwimming();
    }


    loadAllImages() {
        // neu geschriebene funktion zum laden der bildpfade in einer dynamischen for schleife
        this.incoming = loadAnArray('img/2.Enemy/3 Final Enemy/1.Introduce/', 10); // images for incoming
        this.loadImages(this.incoming);
        this.swimming = loadAnArray('img/2.Enemy/3 Final Enemy/2.floating/', 13);
        this.loadImages(this.swimming);
        //////////////////////


        this.loadImages(endboss.ATTACKING);
        this.loadImages(endboss.HURT);
        this.loadImages(endboss.DEAD);
    }


    animate() {
        let i = setInterval(() => {
            if (this.world.character.x > 1800 && this.firstContact) {
                this.playAnimation(this.incoming);
                setTimeout(() => {
                    this.firstContact = false;
                }, 700);
            } else if (this.isHurt()) {
                this.playAnimation(endboss.HURT);
            } else if (this.isDead()) {
                this.playAnimation(endboss.DEAD)
                setTimeout(() => {
                    clearInterval(i);
                }, 600);
            } else {
                this.playAnimation(this.swimming);
            }
        }, 200);
        this.attack();

    }


    attack() {
        setInterval(() => {
            if (this.distance() < 500) {
                this.playAnimation(endboss.ATTACKING);
            } else {
                this.playAnimation(this.swimming);
            }
        }, 200);
    }


    distance() {
        return this.x - this.world.character.x;
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