class Endboss extends movableObject {
    world;
    height = 400;
    width = 250;
    y = 0;
    endBossDirection = false;
    firstContact = true;
    incoming = imagePathLoad('img/2.Enemy/3 Final Enemy/1.Introduce/', 10); // images for incoming
    swimming = imagePathLoad('img/2.Enemy/3 Final Enemy/2.floating/', 13);
    attacking = imagePathLoad('img/2.Enemy/3 Final Enemy/Attack/', 6);
    hurt = imagePathLoad('img/2.Enemy/3 Final Enemy/Hurt/', 4);
    dead = imagePathLoad('img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia ', 6);
    attackAnimation;



    constructor(world) {
        super()
        this.world = world;
        this.loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.reverse();
        this.loadAllImages();
        this.x = 3500;
        this.animate();
        this.timeForSwimming();
        this.attack();
    }


    loadAllImages() {
        this.loadImages(this.incoming);
        this.loadImages(this.swimming);
        this.loadImages(this.attacking);
        this.loadImages(this.hurt);
        this.loadImages(this.dead);
    }

    // allintervalls.push({class: 'endboss', fn:'animate' , id: alles was in der setintervall funktion ist})
    animate() {
        allIntervalls.push(setInterval(() => {
            if (this.world.character.x > 2000 && this.firstContact) {
                this.playAnimation(this.incoming);
                this.x = 2500
                setTimeout(() => {
                    this.firstContact = false;
                    this.attackAnimation = true;
                }, 500);
            } else if (this.isHurt()) {
                this.playAnimation(this.hurt);
            } else if (this.isDead()) {
                this.playAnimation(this.dead)
                this.y -= 30;
                setTimeout(() => {
                    clearInterval(i);
                }, 600);
            } else {
                this.attack();
            }
        }, 100));

    }


    attack() {
        if (this.distance() < 500 && !this.firstContact && this.attackAnimation) {
            this.playAnimation(this.attacking);
        } else {
            this.playAnimation(this.swimming);
        }
    }


    distance() {
        return this.x - this.world.character.x;
    }


    timeForSwimming() {
        let i = setInterval(() => {
            this.swimDirection();
        }, 200)
        allIntervalls.push(i);
    }


    swimDirection() {
        if (!this.endBossDirection) {
            this.moveDown();
        } else {
            this.moveUP();
        }
    }


    reverse() {
        let i = setInterval(() => {
            this.endBossDirection = !this.endBossDirection;
        }, 5000)
        allIntervalls.push(i);
    }
}