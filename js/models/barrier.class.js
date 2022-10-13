class Barrier extends movableObject {

    imagesBarrier;
    type;

    constructor(type, x, y, height, width) {
        super();
        this.type = type,
            this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.loadImage('img/3. Background/Barrier/1.png');
        this.imagesBarrier = imagePathLoad('img/3. Background/Barrier/', 3);
    }

}