class StatusBarCoin extends StatusBar {

    percentage = 0;

    IMAGES = [
        'img/4. Marcadores/orange/0_  copia 2.png',
        'img/4. Marcadores/orange/20_  copia.png',
        'img/4. Marcadores/orange/40_  copia 2.png',
        'img/4. Marcadores/orange/60_  copia 2.png',
        'img/4. Marcadores/orange/80_  copia 2.png',
        'img/4. Marcadores/orange/100_ copia 2.png',

    ];


    constructor() {
        super()
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 40;
        this.width = 150;
        this.height = 50;
        this.setPercentage(0);
    }

}