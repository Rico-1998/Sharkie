class Barrier extends movableObject {

    imagesBarrier;
    type;
    offsets = {
        right: 25,
        left: 20,
        top: 30,
        bottom: 70,
    };

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

    /**
     * function that sets all Barriers by their Type
     */
    setAllBarriers() {
        this.setBarrier('top');
        this.setBarrier('rock');
        this.setBarrier('horizontal');
        this.setBarrier('bottom');
    }


    /**
    * sets Barrier Images by given Type in Level Class
     */
    setBarrier(name) {
        if (this.type === name) {
            this.loadImage(`img/3. Background/Barrier/${this.type}.png`);
        }
        // if(name ==)
    }
}