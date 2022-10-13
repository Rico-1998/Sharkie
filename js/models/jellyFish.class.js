class Jellyfish extends movableObject {

    y = 100;
    height = 60;
    width = 60;
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


    constructor(type, world) {
        super();
        this.world = world;
        this.type = type;
        this.reverse(10000);
        this.electricJellyProperties();
        // this.setJelly();
        this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadAllImages();
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.5 + Math.random();
        this.animateJelly();
    }


    electricJellyProperties() {
        if (this.type == 'electric') {
            this.height = 80;
            this.width = 80;
            this.x = 1500;
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
        let id = setInterval(() => {
            this.swimDirection();
            this.setAnimation(this.purpleDead, 'purple', this.purpleSwimming);
            this.setAnimation(this.yellowDead, 'yellow', this.yellowSwimming);
            this.setAnimation(this.electricJellyDead, 'electric', this.electricJelly);
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