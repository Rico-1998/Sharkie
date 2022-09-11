class Bubble extends movableObject {
    speedX = 20;

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y + this.speed;
        this.height = 30;
        this.width = 30;
        this.throwBubble();
    }


    throwBubble() {
        this.speedY = 0;
        // this.applyGravity();
        if (!world.character.otherDirection) {
            setInterval(() => {
                this.x += 10;
            }, 25);
        } else if (world.character.otherDirection) {
            setInterval(() => {
                this.x -= 10;
            }, 25);
        }
    }
}