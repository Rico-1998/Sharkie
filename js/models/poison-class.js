class Poison extends movableObject {

    width = 60;
    height = 60;
    collected = false;
    offsets = {
        bottom: 0
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

    constructor(x) {
        super();
        this.loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = 40 + Math.random() * 300;
        this.animatePoison();
        this.goUp();
    }


    animatePoison() {
        stopableInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }


    goUp() {
        stopableInterval(() => {
            if (this.collected) {
                this.y -= 30;
            }
        }, 1000 / 60);
    }
}