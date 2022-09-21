class Jellyfish extends movableObject {

    y = 100;
    height = 50;
    width = 40;
    otherDirection = false;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 3.png',
    ];

    IMAGES_DEAD_GREEN = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];



    constructor() {
        super();
        this.reverse('5000');
        this.loadImage('img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD_GREEN);
        this.x = 200 + Math.random() * 2000; // zahl zwischen 200 und 700
        this.speed = 0.5 + Math.random();
        this.animateJelly();
    }


    animateJelly() {
        setInterval(() => {
            this.swimDirection();
        }, 100)

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_GREEN);
                setInterval(() => {
                    this.y -= 10;
                }, 1000 / 25)
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 200)
    }




}