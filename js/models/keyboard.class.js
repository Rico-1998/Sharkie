class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    mobile;

    constructor(mobile) {
        this.mobile = mobile;
        this.keysForMOving();
        this.keysForTouch();
    }

    /**
     * keycodes for moving on mobile Devices
     */
    keysForMOving() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) this.RIGHT = true;
            if (e.keyCode == 37) this.LEFT = true;
            if (e.keyCode == 38) this.UP = true;
            if (e.keyCode == 40) this.DOWN = true;
            if (e.keyCode == 32) this.SPACE = true;
            if (e.keyCode == 68) this.D = true;
        })


        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) this.RIGHT = false;
            if (e.keyCode == 37) this.LEFT = false;
            if (e.keyCode == 38) this.UP = false;
            if (e.keyCode == 40) this.DOWN = false;
            if (e.keyCode == 32) this.SPACE = false;
            if (e.keyCode == 68) this.D = false;
        });
    }


    /**
     * keys for moving on pcs
     */
    keysForTouch() {

        if (this.mobile) {
            this.leftAndRight();
            this.upAndDown();
            this.attack();
        }
    }


    /**
     * keys for moving left and right
     */
    leftAndRight() {
        document.getElementById('left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('left').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('right').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
    }


    /**
     * keys for moving up and down
     */
    upAndDown() {
        document.getElementById('up').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('up').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.UP = false;
        });
        document.getElementById('down').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.DOWN = true;
        });
        document.getElementById('down').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.DOWN = false;
        });
    }


    /**
     * keys for attacking
     */
    attack() {
        document.getElementById('space').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('space').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('bubble').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById('bubble').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.D = false;
        });
    }
}