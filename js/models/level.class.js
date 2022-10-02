class Level {
    world;
    levelNr;
    enemies = [];
    endBoss = [];
    lights = [];
    backGroundObjects = [];
    level_end_x = 2700;
    coins = [];
    poison = [];
    // barrier = [];

    constructor(world) {
        this.world = world;
        this.levelNr = world.levelNr;
        this.initLevel(this.levelNr);
    }


    initLevel(nr) {
        this.loadEnemys(nr);
        this.endBoss.push(new Endboss(this.world));
        this.lights.push(new Light());
        this.loadCoinsandPoison(nr);
        // this.barrier.push(new Barrier());
        this.loadBackgroundImages();
    }


    loadEnemys(nr) {
        // nr * 4 wird angegeben weil anhand der level nr multipliziert mit 4 wird die anzahl der gegner angegeben
        for (let i = 0; i < nr * 4; i++) {
            this.enemies.push(new Jellyfish('purple', this.world));
            this.enemies.push(new Jellyfish('yellow', this.world));
            this.enemies.push(new Pufferfish());
        }
    }


    loadCoinsandPoison(nr) {
        let arrPosionPosition = [500, 650, 900, 1500, 1840];
        for (let i = 0; i < nr * 5; i++) {
            this.coins.push(new Coin());
            this.poison.push(new Poison(arrPosionPosition[i]));
        }
    }


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