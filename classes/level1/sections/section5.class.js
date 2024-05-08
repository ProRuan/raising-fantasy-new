class Section5 {


    // jsdoc
    constructor() {
        this.setTrees();
        this.setLeaves();
        this.setFlyGrass();
        this.setGrass();
        this.setCoins();
        this.setHitPoints();
    }


    // jsdoc
    setTrees() {
        this.trees = [
            new Tree(5.5, 2)
        ];
    }


    // jsdoc
    setLeaves() {
        this.leaves = [
            new Leaf(6.625, 4, 4), new Leaf(7.25, 4.5, 4), new Leaf(7.75, 4, 4)
        ];
    }


    // jsdoc
    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(5, 2), new FlyGrassC(6, 2), new FlyGrassC(7, 2), new FlyGrassC(8, 2),
            new FlyGrassR(9, 2), new FlyGrassL(11, 4), new FlyGrassC(12, 4), new FlyGrassC(13, 4),
            new FlyGrassC(14, 4)
        ];
    }


    // jsdoc
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassC(2, 0), new GrassR(3, 0)
        ];
    }


    // jsdoc
    setCoins() {
        this.coins = [
            new Coin(3.25, 1.125), new Coin(5.25, 3.125), new Coin(9.25, 3.125), new Coin(11.25, 5.125)
        ];
    }


    // jsdoc
    setHitPoints() {
        this.hitPoints = [
            new HitPoint(6.25, 3.125), new HitPoint(8.25, 3.125), new HitPoint(13.75, 5.125)
        ];

    }
}