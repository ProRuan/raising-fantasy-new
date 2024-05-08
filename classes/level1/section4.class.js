class Section4 {


    constructor() {
        this.setTrees();
        this.setLeaves();
        this.setFlyGrass();
        this.setGrass();
        this.setLadders();
        this.setCoins();
        this.setHitPoints();
        // this.setEnemies();
    }


    setTrees() {
        this.trees = [new Tree(2.5, 3.5)];
    }


    setLeaves() {
        this.leaves = [
            new Leaf(3.625, 5.5, 3), new Leaf(4.25, 6, 3), new Leaf(4.75, 5.5, 3)
        ];
    }


    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(2, 3.5), new FlyGrassC(3, 3.5), new FlyGrassC(4, 3.5), new FlyGrassR(5, 3.5),
            new FlyGrassL(9, 3.5), new FlyGrassC(10, 3.5), new FlyGrassC(11, 3.5), new FlyGrassR(12, 3.5)
        ];
    }


    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassC(2, 0), new GrassC(3, 0),
            new GrassC(4, 0), new GrassC(5, 0), new GrassR(6, 0), new GrassL(8, 0),
            new GrassC(9, 0), new GrassC(10, 0), new GrassC(11, 0), new GrassC(12, 0),
            new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    setLadders() {
        this.ladders = [
            new LadderB(3, 0.875), new LadderC(3, 1.375), new LadderC(3, 1.875), new LadderC(3, 2.375),
            new LadderC(3, 2.875), new LadderC(3, 3.375), new LadderT(3, 3.875),
            new LadderB(11.625, 0.875), new LadderC(11.625, 1.375), new LadderC(11.625, 1.875), new LadderC(11.625, 2.375),
            new LadderC(11.625, 2.875), new LadderC(11.625, 3.375), new LadderT(11.625, 3.875)
        ];
    }


    setCoins() {
        this.coins = [
            new Coin(2.25, 4.625), new Coin(5.5, 1.125), new Coin(9, 1.125), new Coin(12.25, 4.625)
        ];
    }


    setHitPoints() {
        this.hitPoints = [
            new HitPoint(7.25, 6.625), new HitPoint(7.25, 3.125)
        ];
    }


    setEnemies() {
        this.enemies = ENEMIES1_4 = [
            new Spider(0.5, 0.1875), new Spider(9, 3.6875), new Spider(14.125, 0.1875)
        ];
    }
}