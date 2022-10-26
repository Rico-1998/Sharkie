class Jellyfish extends movableObject {

    y = 150;
    height = 60;
    width = 60;
    offsets = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };
    otherDirection = false;
    type;
    yellowSwimming = imagePathLoad('img/2.Enemy/2 Jelly fish/Regular damage/Yellow ', 4);
    yellowDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/Yellow/y', 4)
    purpleSwimming = imagePathLoad('img/2.Enemy/2 Jelly fish/Regular damage/Lila ', 4)
    purpleDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/Lila/L', 4);
    electricJelly = imagePathLoad('img/2.Enemy/2 Jelly fish/S｣per dangerous/Green ', 4);
    electricJellyDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/green/g', 4);
    electricJellyPink = imagePathLoad('img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink ', 4);
    electricJellyPinkDead = imagePathLoad('img/2.Enemy/2 Jelly fish/Dead/Pink/P', 4);
    world;




    constructor(type, x) {
        super();
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


    /**
     * setting Images by Type which were given in level class
     */
    setJelly() {
        // durch switch case ersetzen
        if (this.type === 'purple') {
            this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
            // this.swim(this.IMAGES_SWIMMING_PURPLE);
        } else {
            this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        }
    }


    /**
     * setting other offsets for the electric Jellys
     */
    electricJellyProperties() {
        if (this.type == 'electric' || this.type == 'electricPink') {
            this.height = 65;
            this.width = 65;
        }
    }


    /**
     * this function loads all available images of the Jellyfishes
     */
    loadAllImages() {
        this.loadImages(this.yellowSwimming);
        this.loadImages(this.yellowDead);
        this.loadImages(this.purpleSwimming);
        this.loadImages(this.purpleDead);
        this.loadImages(this.electricJelly);
        this.loadImages(this.electricJellyDead);
        this.loadImages(this.electricJellyPink);
        this.loadImages(this.electricJellyPinkDead);
    }


    /**
     * setting all Animations for the Jellys
     */
    animateJelly() {
        stopableInterval(() => {
            this.swimDirection();
            this.setAnimation(this.purpleDead, 'purple', this.purpleSwimming);
            this.setAnimation(this.yellowDead, 'yellow', this.yellowSwimming);
            this.setAnimation(this.electricJellyDead, 'electric', this.electricJelly);
            this.setAnimation(this.electricJellyPinkDead, 'electricPink', this.electricJellyPink);
        }, 125)
    }


    /**
     * 
     * @param {img Array of the respectively Jellyfish} pictures 
     * @param {colour of jelly*} colour 
     * @param {*img Array of the respectively Jellyfish} img 
     */
    setAnimation(pictures, colour, img) {
        if (this.isDead() && this.type === colour) {
            this.playAnimation(pictures);
            stopableInterval(() => {
                this.y -= 2;
            }, 1000 / 25)
        } else if (!this.isDead() && this.type === colour) {
            this.swim(img);
        }
    }


    /**
     * 
     * @param {array with swimming Images} img 
     */
    swim(img) {
        this.playAnimation(img);
    }
}