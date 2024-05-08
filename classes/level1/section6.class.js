class Section6 {


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
        this.trees = [
            new Tree(-2, 4), new Tree(8, 0)
        ];
    }


    setLeaves() {
        this.leaves = [
            new Leaf(-0.875, 6, 5), new Leaf(-0.25, 6.5, 5), new Leaf(0.25, 6, 5),
            new Leaf(9.125, 2, 6), new Leaf(9.75, 2.5, 6), new Leaf(10.25, 2, 6)
        ];
    }


    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassC(0, 4), new FlyGrassC(1, 4), new FlyGrassC(2, 4), new FlyGrassR(3, 4)
        ];
    }


    setGrass() {
        this.grass = [
            new GrassL(1, 0), new GrassC(2, 0), new GrassC(3, 0), new GrassC(4, 0),
            new GrassC(5, 0), new GrassC(6, 0), new GrassC(7, 0), new GrassC(8, 0),
            new GrassC(9, 0), new GrassC(10, 0), new GrassC(11, 0), new GrassC(12, 0),
            new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    setLadders() {
        this.ladders = [
            new LadderB(2.5, 0.875), new LadderC(2.5, 1.375), new LadderC(2.5, 1.875), new LadderC(2.5, 2.375),
            new LadderC(2.5, 2.875), new LadderC(2.5, 3.375), new LadderC(2.5, 3.875), new LadderT(2.5, 4.375)
        ];
    }


    setCoins() {
        this.coins = [
            new Coin(3.25, 5.125), new Coin(5.75, 1.125), new Coin(13.75, 1.125)
        ];
    }


    setHitPoints() {
        this.hitPoints = [
            new HitPoint(0.75, 5.125)
        ];
    }


    setEnemies() {
        this.enemies = [
            new Dino(0.75, 0.25), new Ent(10.859375, 1.625)
        ];
    }
}