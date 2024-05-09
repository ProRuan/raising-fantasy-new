class Section8 {


    constructor() {
        this.setFlyGrass();
        this.setGrass();
        this.setLadders();
        this.setCoins();
        // this.setEnemies();
    }


    // jsdoc
    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(3, 3.5), new FlyGrassC(4, 3.5), new FlyGrassC(5, 3.5), new FlyGrassR(6, 3.5),
            new FlyGrassL(8, -4), new FlyGrassC(9, -4), new FlyGrassR(10, -4)
        ];
    }


    // jsdoc
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassC(2, 0), new GrassC(3, 0),
            new GrassC(4, 0), new GrassC(5, 0), new GrassR(6, 0),
            new GrassL(12, 0), new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    // jsdoc
    setLadders() {
        this.ladders = [
            new LadderB(4.25, 0.875), new LadderC(4.25, 1.375), new LadderC(4.25, 1.875), new LadderC(4.25, 2.375),
            new LadderC(4.25, 2.875), new LadderC(4.25, 3.375), new LadderT(4.25, 3.875)
        ];
    }


    // jsdoc
    setCoins() {
        this.coins = [
            new Coin(9.25, -3.875)
        ];
    }


    setEnemies() {
        this.enemies = [
            new Shaman(12, 2.09375)    // to edit!!!
        ];
    }
}