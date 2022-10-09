class Pufferfish extends movableObject {

    height = 60;
    width = 60;
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
        let i = setInterval(() => {
        if (this.otherDirection) {
            this.getSmall();
        } else {
            this.blowUp();
        }
        }, 250);
        allIntervalls.push(i);
    }

    
    blowUp() {
        if(this.playBlowupAnimation) {
            this.timeOutForTransition();
            this.playBlowupAnimation = !this.playBlowupAnimation;
            
            let j = setInterval(() => {
                this.playAnimation(this.bubbleSwimming);
            }, 100);   
            this.timeForIntervalClear(j);
            this.fishShrinkAnimation = true;
        }
    }


    getSmall() {
        if(this.fishShrinkAnimation) {
        this.timeOutForTransition();
        this.fishShrinkAnimation = false;

        let j = setInterval(() => {
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

        let j = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.dead);
                setInterval(() => {
                    this.y -= 10;
                    this.x -= 10;
                }, 1000 / 60)
            }
        }, 200);
        allIntervalls.push(j);
    }


    movingDirection() {
        let j = setInterval(() => {
            if (!this.otherDirection) {
                this.swimForward();
            } else {
                this.swimBackward();
            };
        }, 100);
        allIntervalls.push(j);
    }


    swimForward() {
        // this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
        this.x -= 4;
    }


    swimBackward() {
        // this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
        this.x += 4;
    }
}












        // // setTimeout(() => {
        //     this.playBlowupAnimation = true;
        //     //     this.fishShrinkAnimation = true;
        //     // }, 100);
        //     switch (true) {
        //         case (this.playBlowupAnimation):
        //             let i = setInterval(() => {
        //                 this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
        //             }, 300);
        //             // setTimeout(() => {
        //             //     clearInterval(i);
        //             //     this.playBlowupAnimation = false;
        //             // }, 500);
        //             this.count++;
    
    
        //             // setTimeout(() => {
        //             //     let j = setInterval(() => {
        //             //         this.playAnimation(greenPufferFish.IMAGES_BUBBLE_SWIMMING);
        //             //     }, 1600);
        //             //     this.intervals.push(j)
        //             // }, 1200);
        //             // setTimeout(() => {
        //             //     clearInterval(this.intervals);
        //             //     this.fishShrinkAnimation = true;
        //             // }, 7000);
    
        //             break;
    
        //         case (this.fishShrinkAnimation):
        //             // console.log('klappt');
        //             break;
    
        //     }
        //     // this.playBlowupAnimation = true;
        //     // if (this.playBlowupAnimation) {
        //     //     this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
        //     //     let i = setInterval(() => {
        //     //         this.playAnimation(greenPufferFish.IMAGES_BUBBLE_SWIMMING);
        //     //     }, 200);
        //     //     this.playBlowupAnimation = false;
        //     //     // setTimeout(() => {
        //     //     //     clearInterval(i);
        //     //     // }, 3500);
        //     // }