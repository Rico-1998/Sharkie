class Light extends movableObject {

    y = 20;
    width = 500;
    height = 250;
    speed = 0.1;

    IMAGES_LIGHT = [
        'img/3. Background/Layers/1. Light/1.png',
        'img/3. Background/Layers/1. Light/2.png'
    ];


    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        // loadImages(this.IMAGES_LIGHT);

        this.x = Math.random() * 1500; // zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}