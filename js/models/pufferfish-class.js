class Pufferfish extends movableObject {

    height = 60;
    width = 60;
    offsets = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };
    type;
    colour;
    playBlowupAnimation = true;
    fishShrinkAnimation = false;
    greenPuffer = {
        swimming: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim', 5),
        transition: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition', 5),
        bubbleSwimming: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim', 5),
        dead: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/pufferfish_dead', 3)
    }

    orangePuffer = {
        swimming: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim', 5),
        transition: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition', 5),
        bubbleSwimming: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim', 5),
        dead: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.', 3)
    }

    redPuffer = {
        swimming: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim', 5),
        transition: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition', 5),
        bubbleSwimming: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim', 5),
        dead: imagePathLoad('img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.', 3),
    }


    constructor(colour, x, y) {
        super();
        this.colour = colour;
        this.type = 'Puffer';
        this.reverse(7000);
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        // this.x = 350 + Math.random() * 2000;
        this.x = x;
        this.y = y;
        this.animatePufferfish();
        this.playBuffAnimation();
    }


    /**
     * loading all available Images of the different Pufferfishes
     */
    loadAllImages() {
        this.loadImages(this.greenPuffer.swimming);
        this.loadImages(this.greenPuffer.transition);
        this.loadImages(this.greenPuffer.bubbleSwimming);
        this.loadImages(this.greenPuffer.dead);
        this.loadImages(this.orangePuffer.swimming);
        this.loadImages(this.orangePuffer.transition);
        this.loadImages(this.orangePuffer.bubbleSwimming);
        this.loadImages(this.orangePuffer.dead);
        this.loadImages(this.redPuffer.swimming);
        this.loadImages(this.redPuffer.transition);
        this.loadImages(this.redPuffer.bubbleSwimming);
        this.loadImages(this.redPuffer.dead);
    }


    /**
     * setting the Buff Animation
     */
    playBuffAnimation() {
        stopableInterval(() => {
            if (this.otherDirection) {
                this.getSmall();
            } else {
                this.blowUp();
            }
        }, 250);
    }


    /**
     * setting the blow up animation
     */
    blowUp() {
        if (this.playBlowupAnimation) {
            this.timeOutForTransition();
            this.playBlowupAnimation = !this.playBlowupAnimation;

            let j = setInterval(() => {
                this.playAnimation(this.setImageByColour().bubbleSwimming);
            }, 100);
            this.timeForIntervalClear(j);
            this.fishShrinkAnimation = true;
        }
    }


    /**
     * 
     * @returns the img Array of the actual Pufferfish
     */
    setImageByColour() {
        if (this.colour == 'green') {
            return this.greenPuffer;
        } else if (this.colour == 'orange') {
            return this.orangePuffer;
        } else if (this.colour == 'red') {
            return this.redPuffer;
        }
    }


    /**
     * blowing down animation
     */
    getSmall() {
        if (this.fishShrinkAnimation) {
            this.timeOutForTransition();
            this.fishShrinkAnimation = false;

            let j = setInterval(() => {
                this.playAnimation(this.setImageByColour().swimming);
            }, 100);
            this.timeForIntervalClear(j);
            this.playBlowupAnimation = true;
        }
    }


    /**
     * animation for transition
     */
    timeOutForTransition() {
        this.playAnimation(this.setImageByColour().transition);
    }


    /**
     * 
     * @param {intervall which has to be cleared} j 
     */
    timeForIntervalClear(j) {
        setTimeout(() => {
            clearInterval(j);
        }, 6600);
    }


    /**
     * animation for all pufferfishes and also dead animation
     */
    animatePufferfish() {
        this.movingDirection();

        stopableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.setImageByColour().dead);
                stopableInterval(() => {
                    this.y -= 10;
                    this.x -= 10;
                }, 1000 / 60)
            }
        }, 200);
    }


    /**
     * intervall for going up or going down
     */
    movingDirection() {
        stopableInterval(() => {
            if (!this.otherDirection) {
                this.swimForward();
            } else {
                this.swimBackward();
            };
        }, 100);
    }


    /**
     * adding amount to x for going left
     */
    swimForward() {
        this.x -= 4;
    }


    /**
     * adding amount to x for going right
     */
    swimBackward() {
        this.x += 4;
    }
}