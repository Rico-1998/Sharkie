class Barrier extends movableObject {

    x = 100;
    y = 0;
    height = 500;
    width = 600;

    IMAGES_BARRIER = [
        'img/3. Background/Barrier/1.png',
        'img/3. Background/Barrier/2.png',
        'img/3. Background/Barrier/3.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_BARRIER[0]);
    }
}