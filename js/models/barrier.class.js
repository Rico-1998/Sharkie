class Barrier extends movableObject {

    imagesBarrier;
    type;

    constructor(type, x, y, height, width) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.loadImage('img/3. Background/Barrier/top.png');
        this.setAllBarriers();
    }


    setAllBarriers() {
        this.setBarrier('top');
        this.setBarrier('rock');
        this.setBarrier('horizontal');
        this.setBarrier('bottom');
    }


    setBarrier(name) {
        if (this.type === name) {
            this.loadImage(`img/3. Background/Barrier/${this.type}.png`);
        }
        // if(name ==)
    }
}