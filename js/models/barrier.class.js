class Barrier extends movableObject {

    x = 100;
    y = 0;
    height = 500;
    width = 600;
    imagesBarrier;

    constructor() {
        super()
        this.loadImage('img/3. Background/Barrier/1.png');
        this.imagesBarrier = imagePathLoad('img/3. Background/Barrier/', 3);
    }
}