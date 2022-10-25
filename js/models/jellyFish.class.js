class Jellyfish extends movableObject {

    y = 150;
    height = 60;
    width = 60;
    offsets = {
        x: 0,
        y: 30,
        bottom: -50
    };
    otherDirection = false;
    type;
    yellowSwimming = imagePathLoad('img/2.Enemy/2 Jelly fish/Regular damage/Yellow ', 4);
    yellowDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/Yellow/y', 4)
    purpleSwimming = imagePathLoad('img/2.Enemy/2 Jelly fish/Regular damage/Lila ', 4)
    purpleDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/Lila/L', 4);
    electricJelly = imagePathLoad('img/2.Enemy/2 Jelly fish/S｣per dangerous/Green ', 4);
    electricJellyDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/green/g', 4);
    world;


    setJelly() {
        // durch switch case ersetzen
        if (this.type === 'purple') {
            this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
            // this.swim(this.IMAGES_SWIMMING_PURPLE);
        } else {
            this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        }
    }


    constructor(type, world, x) {
        super();
        this.world = world;
        this.type = type;
        this.reverse(6000);
        this.electricJellyProperties();
        // this.setJelly();
        this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadAllImages();
        this.x = x;
        this.speed = 0.5 + Math.random();
        this.animateJelly();
    }


    electricJellyProperties() {
        if (this.type == 'electric') {
            this.height = 80;
            this.width = 80;
            // theta is: arccos(1-(d/r)^2/2)
        }
    }


    loadAllImages() {
        this.loadImages(this.yellowSwimming);
        this.loadImages(this.yellowDead);
        this.loadImages(this.purpleSwimming);
        this.loadImages(this.purpleDead);
        this.loadImages(this.electricJelly);
        this.loadImages(this.electricJellyDead);
    }


    animateJelly() {
        stopableInterval(() => {
            this.swimDirection();
            this.setAnimation(this.purpleDead, 'purple', this.purpleSwimming);
            this.setAnimation(this.yellowDead, 'yellow', this.yellowSwimming);
            this.setAnimation(this.electricJellyDead, 'electric', this.electricJelly);
        }, 125)
    }


    setAnimation(pictures, colour, img) {
        if (this.isDead() && this.type === colour) {
            this.playAnimation(pictures);
            stopableInterval(() => {
                this.y -= 10;
            }, 1000 / 25)
        } else if (!this.isDead() && this.type === colour) {
            this.swim(img);
        }
    }


    swim(img) {
        this.playAnimation(img);
    }
}