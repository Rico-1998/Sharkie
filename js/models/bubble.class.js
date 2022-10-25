class Bubble extends movableObject {
    speedX = 20;
    bubble = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';


    constructor(x, y) {
        super()
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y + this.speed;
        this.height = 30;
        this.width = 30;
        this.throwBubble();
        this.changeBubble();
    }


    throwBubble() {
        this.speedY = 0;
        // this.applyGravity();
        if (!world.character.otherDirection) {
            stopableInterval(() => {
                this.x += 7;
            }, 25);
        } else if (world.character.otherDirection) {
            stopableInterval(() => {
                this.x -= 7;
            }, 25);
        }

    }

    changeBubble() {
        if (world.statusBarPoison.percentage == 100) {
            this.bubble = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';
            this.loadImage(this.bubble);
        }
    }
}