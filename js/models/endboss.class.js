class Endboss extends movableObject {
    world;
    height = 400;
    width = 250;
    y = 0;
    endBossDirection = false;
    firstContact = true;
    incoming; // am besten auch immer schreiben arr wenn es ein array ist für die bessere identifikation der variable
    swimming;
    attacking;
    hurt;
    dead;



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
        this.incoming = imagePathLoad('img/2.Enemy/3 Final Enemy/1.Introduce/', 10); // images for incoming
        this.loadImages(this.incoming);
        this.swimming = imagePathLoad('img/2.Enemy/3 Final Enemy/2.floating/', 13);
        this.loadImages(this.swimming);
        this.attacking = imagePathLoad('img/2.Enemy/3 Final Enemy/Attack/', 6);
        this.loadImages(this.attacking);
        this.hurt = imagePathLoad('img/2.Enemy/3 Final Enemy/Hurt/', 4);
        this.loadImages(this.hurt);
        this.dead = imagePathLoad('img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia ', 6);
        this.loadImages(this.dead);
    }


    animate() {
        let i = setInterval(() => {
            if (this.world.character.x > 2000 && this.firstContact) {
                this.playAnimation(this.incoming);
                setTimeout(() => {
                    this.firstContact = false;
                }, 700);
            } else if (this.isHurt()) {
                this.playAnimation(this.hurt);
            } else if (this.isDead()) {
                this.playAnimation(this.dead)
                setTimeout(() => {
                    clearInterval(i);
                    // this.y -= 10
                }, 600);
            } else {
                this.playAnimation(this.swimming);
            }
        }, 200);
        // this.attack();

    }


    attack() {
        setInterval(() => {
            if (this.distance() < 500 && !this.firstContact) {
                this.playAnimation(this.attacking);
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