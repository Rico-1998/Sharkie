class Level {
    enemies;
    light;
    backGroundObjects;
    level_end_x = 2200;
    coins;
    barrier;

    constructor(enemies, light, backGroundObjects, coins, barrier) {
        this.enemies = enemies;
        this.light = light;
        this.backGroundObjects = backGroundObjects;
        this.coins = coins;
        this.barrier = barrier;
    }
}