class StatusBarCoin extends StatusBar {

    percentage = 0;

    IMAGES = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];



    constructor() {
        super()
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 40;
        this.width = 175;
        this.height = 60;
        this.setPercentage(0);
    }

}