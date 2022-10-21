class BackgroundObject extends movableObject {

    width = CANVAS_WIDTH;
    height = 480;


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
        // this.move();
    }


    move() {
        let i = setInterval(() => {
            this.x -= 0.5;
        }, 100);
        allIntervalls.push(i);
    }


}