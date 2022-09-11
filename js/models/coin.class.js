class Coin extends movableObject {

    width = 40;
    height = 40;


    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/3.png');
        this.x = 200 + Math.random() * 2000; // zahl zwischen 200 und 2100
        this.y = 10 + Math.random() * 250;
    }
}