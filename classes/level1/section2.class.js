class Section2 {


    constructor() {
        this.set();
    }


    set() {
        this.setTrees();
        this.setLeaves();
        this.setFlyGrass();
        this.setGrass();
        this.setCoins();
        this.setHitPoints();
        // this.setEnemies();
    }


    setTrees() {
        this.trees = [new Tree(5.5, 2)];
    }


    setLeaves() {
        this.leaves = [
            new Leaf(6.625, 4, 1), new Leaf(7.25, 4.5, 1), new Leaf(7.75, 4, 1)
        ];
    }


    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(6, 2), new FlyGrassC(7, 2), new FlyGrassR(8, 2)
        ];
    }


    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassC(2, 0), new GrassC(3, 0),
            new GrassC(4, 0), new GrassC(5, 0), new GrassC(6, 0), new GrassC(7, 0),
            new GrassC(8, 0), new GrassC(9, 0), new GrassC(10, 0), new GrassC(11, 0),
            new GrassC(12, 0), new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    setCoins() {
        this.coins = [
            new Coin(3.25, 1.125), new Coin(4.25, 1.125), new Coin(6.25, 3.125), new Coin(10.25, 1.125)
        ];
    }


    setHitPoints() {
        this.hitPoints = [new HitPoint(8.25, 3.125)];
    }


    setEnemies() {
        this.enemies = [new Dino(0.875, 0.25), new Dino(11.8125, 0.25)];
    }
}