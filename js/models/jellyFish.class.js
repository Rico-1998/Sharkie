class Jellyfish extends movableObject {

    y = 100;
    height = 40;
    width = 40;
    otherDirection = false;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 3.png',
    ];

    constructor() {
        super();
        this.reverse(this.otherDirection);
        this.loadImage('img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SWIMMING);

        this.x = 200 + Math.random() * 2000; // zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.swimDirection();
        }, 200)


        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 200)
    }




}