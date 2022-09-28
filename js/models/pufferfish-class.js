class Pufferfish extends movableObject {

    height = 60;
    width = 60;
    type;
    playBlowupAnimation = true;
    fishShrinkAnimation = false;


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
        this.loadImages(greenPufferFish.IMAGES_SWIMMING);
        this.loadImages(greenPufferFish.IMAGES_BUBBLE_SWIMMING);
        this.loadImages(greenPufferFish.IMAGES_TRANSITION);
        this.loadImages(greenPufferFish.IMAGES_DEAD);
    }


    playBuffAnimation() {
        setInterval(() => {
        if (this.otherDirection) {
            this.getSmall();
        } else {
            this.blowUp();
        }
        }, 250);
    }

    
    blowUp() {
        if(this.playBlowupAnimation) {
            this.timeOutForTransition();
            this.playBlowupAnimation = false;
            // die untere zeile dreht den boolean um aus true wird false und umgedreht (toggle)
            // this.playBlowupAnimation = !this.playBlowupAnimation;
            let j = setInterval(() => {
                this.playAnimation(greenPufferFish.IMAGES_BUBBLE_SWIMMING);
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
            this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
        }, 100);   
        this.timeForIntervalClear(j);
        this.playBlowupAnimation = true;

        }
    }


    timeOutForTransition() {
        let i = setInterval(() => {
            this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
        }, 200);
        setTimeout(() => {
            clearInterval(i);
        }, 500);
    }


    timeForIntervalClear(j) {
        setTimeout(() => {
            clearInterval(j);
        }, 6200);
    }



    animatePufferfish() {
        this.movingDirection();

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(greenPufferFish.IMAGES_DEAD);
                setInterval(() => {
                    this.y -= 10;
                    this.x -= 10;
                }, 1000 / 60)
            }
        }, 200);
    }


    movingDirection() {
        setInterval(() => {
            if (!this.otherDirection) {
                this.swimForward();
            } else {
                this.swimBackward();
            };
        }, 100)
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