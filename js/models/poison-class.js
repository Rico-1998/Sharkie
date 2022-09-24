class Poison extends movableObject {

    width = 40;
    height = 60;

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
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = 20 + Math.random() * 300;
        this.animatePoison();
    }

    animatePoison() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}