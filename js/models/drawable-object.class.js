class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = -350;
    y = 280;
    height = 150;
    width = 100;


    /**
     * 
     * this function sets the first image which has to be shown
     * @param {imagePath} path 
     */
    loadImage(path) {
        // if (this.img === undefined) {
        this.img = new Image(); //Diese Zeile ist das gleiche wie this.img = document.getElementById('image') <img id='image' src>
        // }  ansonsten legt man immer wieder ein neues img an was aber nicht gebraucht wird weil bereits eine instanz img für den aktuellen pfad existiert
        this.img.src = path;
    }


    /**
     * 
     * this functon includes all parameters which are needed for drawing it in canvas
     * @param {canvas} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * 
     * frame for Jellyfish,Bubble and Pufferfish
     * @param {canvas} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Jellyfish || this instanceof Coin || this instanceof Bubble || this instanceof Pufferfish) { // instanceof zeigt den blauen rahmen nur für die ausgewählte klasse an
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
  * 
  * frame for Character
  * @param {canvas} ctx 
  */
    drawFrameCharacter(ctx) {
        if (this instanceof Character) { // instanceof zeigt den blauen rahmen nur für die ausgewählte klasse an
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            // ctx.rect(this.x + 10, this.y + 65, this.width - 20, this.height - 95);
            ctx.rect(this.x + 10, this.y, this.width - 20, this.height);
            ctx.stroke();
        }
    }


    /**
    * 
    * frame for Barrier
    * @param {canvas} ctx 
    */
    drawFrameBarrier(ctx) {
        if (this instanceof Barrier) { // instanceof zeigt den blauen rahmen nur für die ausgewählte klasse an
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
    * 
    * frame for Endboss
    * @param {canvas} ctx 
    */
    drawFrameEndboss(ctx) {
        if (this instanceof Endboss) { // instanceof zeigt den blauen rahmen nur für die ausgewählte klasse an
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y + 150, this.width - 20, this.height - 220);
            ctx.stroke();
        }
    }



    /**
    * 
    * @param {Array} arr - ['img/image1.png' , 'img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}