class StatusBar extends movableObject {

    IMAGES = [
        'img/4. Marcadores/Purple/0_ .png', // 0
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/40_ .png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/80_ .png',
        'img/4. Marcadores/Purple/100_ .png' // 5
    ];


    percentage = 100;

    constructor() {
        super(); // initalisiert alle funktionen und variablen aus der über geordneten Klasse.
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setPercentage(100);
    }


    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage; // => 0... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.resolveImageIndex()
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        };
    }
}