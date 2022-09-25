class Pufferfish extends movableObject {

    height = 50;
    width = 50;
    type;
    playBlowupAnimation = false;
    fishShrinkAnimation = false;
    intervals = [];
    count = 0;



    constructor() {
        super();
        this.type = 'greenPuffer';
        this.reverse('7000');
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        // this.x = 350 + Math.random() * 2000;
        this.x = 350
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
        // setInterval(() => {
        if (this.otherDirection) {
            this.getSmall();
            // setTimeout(() => {
            // }, 500);
        } else {
                if (this.count === 0) {
                    debugger
                    this.blowUp();
                    console.log('this count', this.count);
                }
        }
        // }, 250);
    }

    // mal versuchen eine variable zuerst auf false zu setzen
    blowUp() {
        // this.playBlowupAnimation = true;
        // if(this.playBlowupAnimation) {
                // let i = setInterval(() => {
                   this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
                // }, 300);
                //     clearInterval(i);
                //     this.playBlowupAnimation = false;
                // setTimeout(() => {
                this.count++;
                // }, 1500);
        // }
    }


    getSmall() {
        // console.log('klappt');

        // if (this.otherDirection) {
        //     this.fishShrinkAnimation = true;
        //     this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
        //     setInterval(() => {
        //         this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
        //     }, 200);
        // }
        // this.fishShrinkAnimation = false;
    }



    animatePufferfish() {
        this.movingDirection();

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(greenPufferFish.IMAGES_DEAD);
                setInterval(() => {
                    this.y -= 10;
                    this.x -= 10;
                }, 1000 / 25)
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