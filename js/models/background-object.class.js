class BackgroundObject extends movableObject {

    width = CANVAS_WIDTH;
    height = 600;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 600 - this.height;
        // this.move();
    }


    move() {
        setInterval(() => {
            this.x -= 0.5;
        }, 100);
    }
}