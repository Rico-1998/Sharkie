class Pufferfish extends movableObject {

    world;
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


    constructor(colour, x, y, world) {
        super();
        this.world = world;
        this.colour = colour;
        this.type = 'Puffer';
        this.reverse(7000);
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        this.x = x;
        this.y = y;
        this.moveTillAggressive();
    }
    // this.playAnimation(this.setImageByColour().bubbleSwimming);

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


    moveTillAggressive() {
        stopableInterval(() => {
            if (!this.otherDirection) {
                this.playAnimation(this.setImageByColour().swimming);
                this.x -= 4;
            } else {
                this.playAnimation(this.setImageByColour().bubbleSwimming);
                this.x += 4;
            }

        }, 100)
    }

}