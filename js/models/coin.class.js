class Coin extends movableObject {

    width = 40;
    height = 40;
    collected = false;
    coinImg = imagePathLoad('img/4. Marcadores/1. Coins/', 4);
    offsets = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };



    constructor(x, y) {
        super()
        this.loadImage('img/4. Marcadores/1. Coins/3.png');
        this.loadImages(this.coinImg);
        this.x = x;
        this.y = y;
        // this.x = 200 + Math.random() * 2000; // zahl zwischen 200 und 2100
        // this.y = 40 + Math.random() * 250;
        this.animateCoin();
        this.goUp();
    }


    /**
     * intervall for collected Coin
     */
    animateCoin() {
        stopableInterval(() => {
            this.playAnimation(this.coinImg);
        }, 1000 / 5);
    }


    /**
     * animation for collected coin. It will goes up
     */
    goUp() {
        stopableInterval(() => {
            if (this.collected) {
                this.y -= 30;
            }
        }, 1000 / 60);
    }

}