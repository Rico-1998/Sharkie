class Coin extends movableObject {

    width = 40;
    height = 40;

    COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    constructor() {
        super()
        this.loadImage('img/4. Marcadores/1. Coins/3.png');
        this.loadImages(this.COINS);
        this.x = 200 + Math.random() * 2000; // zahl zwischen 200 und 2100
        this.y = 10 + Math.random() * 250;
        this.animateCoin();
    }


    animateCoin() {
        setInterval(() => {
            this.playAnimation(this.COINS);
        }, 1000 / 5);
    }
}