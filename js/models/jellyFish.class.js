class Jellyfish extends movableObject {

    y = 100;
    height = 60;
    width = 60;
    otherDirection = false;
    type;
    world;


    IMAGES_SWIMMING_PURPLE = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];

    IMAGES_PURPLE_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    IMAGES_SWIMMING_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    IMAGES_YELLOW_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ];


    setJelly() {
        // durch switch case ersetzen
        if (this.type === 'purple') {
            this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
            // this.swim(this.IMAGES_SWIMMING_PURPLE);
        } else {
            this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        }
    }


    constructor(type, world) {
        super();
        this.world = world;
        this.type = type;
        this.reverse(10000);
        // this.setJelly();
        this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadAllImages();
        this.x = 200 + Math.random() * 2000; // zahl zwischen 200 und 700
        this.speed = 0.5 + Math.random();
        this.animateJelly();
    }


    loadAllImages() {
        this.loadImages(this.IMAGES_SWIMMING_PURPLE);
        this.loadImages(this.IMAGES_SWIMMING_YELLOW);
        this.loadImages(this.IMAGES_PURPLE_DEAD);
        this.loadImages(this.IMAGES_YELLOW_DEAD);
    }


    animateJelly() {
        let id = setInterval(() => {
            this.swimDirection();
            this.setAnimation(this.IMAGES_PURPLE_DEAD, 'purple', this.IMAGES_SWIMMING_PURPLE);
            this.setAnimation(this.IMAGES_YELLOW_DEAD, 'yellow', this.IMAGES_SWIMMING_YELLOW);
        }, 125)
        allIntervalls.push(id)
    }


    setAnimation(pictures, colour, img) {
        if (this.isDead() && this.type === colour) {
            this.playAnimation(pictures);
            let id = setInterval(() => {
                this.y -= 10;
            }, 1000 / 25)
            allIntervalls.push(id)
        } else if (!this.isDead() && this.type === colour) {
            this.swim(img);
        }
    }


    swim(img) {
        this.playAnimation(img);
    }
}