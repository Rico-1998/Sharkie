class Poison extends movableObject {

    width = 60;
    height = 60;
    collected = false;
    offsets = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };

    IMAGES = [
        'img/4. Marcadores/Posiขn/Animada/1.png',
        'img/4. Marcadores/Posiขn/Animada/2.png',
        'img/4. Marcadores/Posiขn/Animada/3.png',
        'img/4. Marcadores/Posiขn/Animada/4.png',
        'img/4. Marcadores/Posiขn/Animada/5.png',
        'img/4. Marcadores/Posiขn/Animada/6.png',
        'img/4. Marcadores/Posiขn/Animada/7.png',
        'img/4. Marcadores/Posiขn/Animada/8.png'
    ]

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animatePoison();
        this.goUp();
    }


    /**
     * setting the Animation for The poison Bottles
     */
    animatePoison() {
        stopableInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }


    /**
     * if a bottle was collected this function is for animating the Bottle to go up
     */
    goUp() {
        stopableInterval(() => {
            if (this.collected) {
                this.y -= 30;
            }
        }, 1000 / 60);
    }
}