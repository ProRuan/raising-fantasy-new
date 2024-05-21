class Section3 {


    // jsdoc
    constructor() {
        this.setTrees();
        this.setLeaves();
        this.setGrass();
        this.setCoins();
        this.setHitPoints();
        this.setEnemies();
    }


    // jsdoc
    setTrees() {
        this.trees = [
            new Tree(8, 0)
        ];
    }


    // jsdoc
    setLeaves() {
        this.leaves = [
            new Leaf(9.125, 2, 2), new Leaf(9.75, 2.5, 2), new Leaf(10.25, 2, 2)
        ];
    }


    // jsdoc
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassR(2, 0), new GrassL(5, 0),
            new GrassC(6, 0), new GrassC(7, 0), new GrassC(8, 0), new GrassC(9, 0),
            new GrassC(10, 0), new GrassC(11, 0), new GrassC(12, 0), new GrassC(13, 0),
            new GrassC(14, 0)
        ];
    }


    // jsdoc
    setCoins() {
        this.coins = [
            new Coin(2, 1.125), new Coin(5.5, 1.125), new Coin(8.25, 1.125), new Coin(11.25, 1.125)
        ];
    }


    // jsdoc
    setHitPoints() {
        this.hitPoints = [
            new HitPoint(3.75, 3.125)
        ];
    }


    // jsdoc
    setEnemies() {
        this.enemies = [
            new Ent(8.1875, -0.375)
        ];
    }
}