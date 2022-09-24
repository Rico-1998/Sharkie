class StatusBarPoison extends StatusBar {

    IMAGES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 80;
        this.width = 150;
        this.height = 50;
        this.setPercentage(0);
    }
}