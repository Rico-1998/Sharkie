class StatusBar extends movableObject {

    IMAGES = [
        'img/4. Marcadores/Purple/0_ .png', // 0
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/40_ .png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/80_ .png',
        'img/4. Marcadores/Purple/100_ .png' // 5
    ];

    IMAGESCOIN = [
        'img/4. Marcadores/orange/0_  copia 2.png',
        'img/4. Marcadores/orange/20_  copia 2.png',
        'img/4. Marcadores/orange/40_  copia 2.png',
        'img/4. Marcadores/orange/60_  copia 2.png',
        'img/4. Marcadores/orange/80_  copia 2.png',
        'img/4. Marcadores/orange/100_ copia 2.png',
    ];

    IMAGESPOISON = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
    ];
    world;
    type;
    percentage;



    constructor(type, y, world) {
        super(); // initalisiert alle funktionen und variablen aus der über geordneten Klasse.
        this.type = type;
        this.world = world;
        this.x = 10;
        this.width = 150;
        this.height = 50;
        this.y = y;
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGESCOIN);
        this.loadImages(this.IMAGESPOISON);
        this.setStatusBar();
    }


    /**
     * setting Percentage of al StatusBars
     */
    setStatusBar() {
        if (this.type == 'health') {
            this.setPercentage(100);
        } else if (this.type == 'coin') {
            this.setPercentage(0);
        } else if (this.type == 'poison') {
            this.setPercentage(0);
        } else if (this.type == 'boss') {
            stopableInterval(() => {
                if (world.character.x > 2300) {
                    this.y = 400;
                }
            }, 300)
            this.y = -80;
            this.x = 400;
            this.width = 300;
            this.setPercentage(100);
        }
    }


    /**
     * checking the actual position from character in x
     */
    checkCharacterPosition() {
        stopableInterval(() => {
            world.character.x > 2000;
        }, 300)
    }


    /**
     * 
     * @param {type of Statusbar} type 
     * @returns img array for Statusbar by their given type
     */
    changeImagesByType(type) {
        if (type == 'health') {
            return this.IMAGES;
        } else if (type == 'coin') {
            return this.IMAGESCOIN;
        } else if (type == 'poison') {
            return this.IMAGESPOISON;
        } else if (type == 'boss') {
            return this.IMAGES;
        }
    }


    /**
     * 
     * @param {percentage which where shown} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0... 5
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        let path = this.changeImagesByType(this.type)[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.resolveImageIndex()
    }


    /**
     * 
     * @returns a nr for the actual img in array
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        };
    }
}