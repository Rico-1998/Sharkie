class Pufferfish extends movableObject {

    height = 60;
    width = 60;
    offsets = {
        x: 0,
        y: 0,
        bottom: 0
    };
    type;
    playBlowupAnimation = true;
    fishShrinkAnimation = false;
    swimming = imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim', 5);
    transition = imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition', 5);
    bubbleSwimming = imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim', 5)
    dead = imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/pufferfish_dead', 3)



    constructor() {
        super();
        this.type = 'greenPuffer';
        this.reverse(7000);
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        this.x = 350 + Math.random() * 2000;
        // this.x = 350
        this.y = 25 + Math.random() * 350;
        this.animatePufferfish();
        this.playBuffAnimation();
    }


    loadAllImages() {
        this.loadImages(this.swimming);
        this.loadImages(this.transition);
        this.loadImages(this.bubbleSwimming);
        this.loadImages(this.dead);
    }


    playBuffAnimation() {
        stopableInterval(() => {
            if (this.otherDirection) {
                this.getSmall();
            } else {
                this.blowUp();
            }
        }, 250);
    }


    blowUp() {
        if (this.playBlowupAnimation) {
            this.timeOutForTransition();
            this.playBlowupAnimation = !this.playBlowupAnimation;

            let j = stopableInterval(() => {
                this.playAnimation(this.bubbleSwimming);
            }, 100);
            this.timeForIntervalClear(j);
            this.fishShrinkAnimation = true;
        }
    }


    getSmall() {
        if (this.fishShrinkAnimation) {
            this.timeOutForTransition();
            this.fishShrinkAnimation = false;

            let j = stopableInterval(() => {
                this.playAnimation(this.swimming);
            }, 100);
            this.timeForIntervalClear(j);
            this.playBlowupAnimation = true;
        }
    }


    timeOutForTransition() {
        this.playAnimation(this.transition);
    }


    timeForIntervalClear(j) {
        setTimeout(() => {
            clearInterval(j);
        }, 6600);
    }


    animatePufferfish() {
        this.movingDirection();

        stopableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.dead);
                stopableInterval(() => {
                    this.y -= 10;
                    this.x -= 10;
                }, 1000 / 60)
            }
        }, 200);
    }


    movingDirection() {
        stopableInterval(() => {
            if (!this.otherDirection) {
                this.swimForward();
            } else {
                this.swimBackward();
            };
        }, 100);
    }


    swimForward() {
        this.x -= 4;
    }


    swimBackward() {
        this.x += 4;
    }
}