class Level {
    enemies;
    endBoss;
    light;
    backGroundObjects;
    level_end_x = 2700;
    coins;
    barrier;

    constructor(enemies, endBoss, light, backGroundObjects, coins, barrier) {
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.light = light;
        this.backGroundObjects = backGroundObjects;
        this.coins = coins;
        this.barrier = barrier;
    }
}