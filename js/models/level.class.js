class Level {
    world;
    levelNr;
    enemies = [];
    endBoss = [];
    lights = [];
    backGroundObjects = [];
    level_end_x = 3200;
    coins = [];
    poison = [];
    barrier = [];

    constructor(world) {
        this.world = world;
        this.levelNr = world.levelNr;
        this.initLevel(this.levelNr);
    }


    /**
     * initialize the Level
     * @param {levelNr} nr 
     */
    initLevel(nr) {
        this.loadEnemys();
        this.endBoss.push(new Endboss(this.world));
        this.lights.push(new Light());
        this.loadCoinsandPoison(nr);
        this.loadBackgroundImages();
        this.loadBarriers();
    }


    /**
     * loading All Enemys
     */
    loadEnemys() {
        // nr * 4 wird angegeben weil anhand der level nr multipliziert mit 4 wird die anzahl der gegner angegeben
        // for (let i = 0; i < nr * 4; i++) {
        this.enemies.push(new Jellyfish('purple', -200));
        this.enemies.push(new Jellyfish('purple', 900));
        this.enemies.push(new Jellyfish('purple', 1500));
        this.enemies.push(new Jellyfish('purple', 2000));
        this.enemies.push(new Jellyfish('electricPink', 600));
        this.enemies.push(new Jellyfish('yellow', 1200));
        this.enemies.push(new Jellyfish('yellow', 2200));
        this.enemies.push(new Jellyfish('yellow', 1400));
        this.enemies.push(new Pufferfish('green', 100, 100));
        this.enemies.push(new Pufferfish('orange', 1750, 150));
        this.enemies.push(new Pufferfish('red', 1000, 50));
        // }
        this.enemies.push(new Jellyfish('electric', this.world, 2700));
    }


    /**
     * loading all Barriers
     */
    loadBarriers() {
        this.barrier.push(new Barrier('top', -100, -52, 200, 600));
        this.barrier.push(new Barrier('rock', 1200, 300, 300, 300));
        this.barrier.push(new Barrier('top', 1500, -52, 200, 700));
        this.barrier.push(new Barrier('horizontal', 2300, 200, 300, 300));
        this.barrier.push(new Barrier('bottom', 150, 350, 150, 600));
    }


    /**
     * loading all Collectables
     * @param {levelNr} nr 
     */
    loadCoinsandPoison(nr) {
        let coinPositionX = [-150, 50, -230, 210, 900, 1175, 1250, 1350, 1450, 1500, 1750, 1750, 2275, 2275, 2275];
        let coinPositionY = [10, 75, 10, 75, 50, 400, 300, 250, 300, 400, 150, 300, 370, 290, 210];
        let poisonPositionX = [100, 120, 325, 410, 495, 500, 925, 925, 925, 2350, 2430, 2510];
        let poisonPositionY = [350, 50, 300, 275, 300, 5, 350, 270, 190, 130, 130, 130];
        for (let i = 0; i < nr * 15; i++) {
            this.coins.push(new Coin(coinPositionX[i], coinPositionY[i]));
            this.poison.push(new Poison(poisonPositionX[i], poisonPositionY[i]));
        }
    }


    /**
     * loading all Background Images
     */
    loadBackgroundImages() {
        // -800, 0, 800, 1600 , 2400, 3200
        let canvasStart = -800;
        for (let i = 0; i < 3; i++) {
            let px = canvasStart + CANVAS_WIDTH * (i + 3);
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Layers/5. Water/D${i}.png`, canvasStart + CANVAS_WIDTH * i));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Layers/5. Water/D${i}.png`, px));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Layers/3.Fondo 1/D${i}.png`, canvasStart + CANVAS_WIDTH * i));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Layers/3.Fondo 1/D${i}.png`, px));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Layers/4.Fondo 2/D${i}.png`, canvasStart + CANVAS_WIDTH * i));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Layers/4.Fondo 2/D${i}.png`, px));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Legacy/Layers/2. Floor/D${i + 1}.png`, canvasStart + CANVAS_WIDTH * i));
            this.backGroundObjects.push(new BackgroundObject(`img/3. Background/Legacy/Layers/2. Floor/D${i + 1}.png`, px));
        }
    }

}