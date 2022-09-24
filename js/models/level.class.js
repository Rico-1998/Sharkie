class Level {
    enemies;
    endBoss;
    light;
    backGroundObjects;
    level_end_x = 2700;
    coins;
    poison;
    barrier;

    constructor(enemies, endBoss, light, backGroundObjects, coins, poison, barrier) {
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.light = light;
        this.backGroundObjects = backGroundObjects;
        this.coins = coins;
        this.poison = poison;
        this.barrier = barrier;
    }
}