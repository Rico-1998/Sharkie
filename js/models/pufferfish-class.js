class Pufferfish extends movableObject {

    height = 50;
    width = 50;
    otherDirection = false;
    type;

    constructor() {
        super();
        this.type = 'greenPuffer';
        this.reverse('7000');
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        this.x = 350 + Math.random() * 2000;
        this.y = 25 + Math.random() * 350;
        this.animatePufferfish();
    }

    loadAllImages() {
        this.loadImages(greenPufferFish.IMAGES_SWIMMING);
        this.loadImages(greenPufferFish.IMAGES_BUBBLE_SWIMMING);
        this.loadImages(greenPufferFish.IMAGES_TRANSITION);
        this.loadImages(greenPufferFish.IMAGES_DEAD);
    }


    animatePufferfish() {
        this.movingDirection();

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(greenPufferFish.IMAGES_DEAD);
                // setInterval(() => {
                //     this.y -= 10;
                // }, 1000 / 25)
            } else {
                this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
            }
        }, 200)
    }


    movingDirection() {
        setInterval(() => {
            if (!this.otherDirection) {
                this.swimForward();
            } else {
                this.swimBackward();
            };
        }, 200)
    }


    swimForward() {
        this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
        this.x -= 4;
        // setTimeout(() => {
        //     setInterval(() => {
        //         this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
        //         this.playAnimation(greenPufferFish.IMAGES_BUBBLE_SWIMMING)
        //     }, 800)
        // }, 1000);
    }


    swimBackward() {
        this.playAnimation(greenPufferFish.IMAGES_SWIMMING);
        this.x += 4;
        // setTimeout(() => {
        //     setInterval(() => {
        //         this.playAnimation(greenPufferFish.IMAGES_TRANSITION);
        //         this.playAnimation(greenPufferFish.IMAGES_BUBBLE_SWIMMING)
        //     }, 300)
        // }, 1000);
    }
}