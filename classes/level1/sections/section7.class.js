class Section7 {


    constructor() {
        this.setFlyGrass();
        this.setGrass();
        this.setCoins();
        this.setCrystals();
        this.setHitPoints();
        // this.setEnemies();
    }


    // jsdoc
    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(3, 2), new FlyGrassC(4, 2), new FlyGrassC(5, 2), new FlyGrassC(6, 2),
            new FlyGrassC(7, 2), new FlyGrassC(8, 2), new FlyGrassC(9, 2), new FlyGrassC(10, 2),
            new FlyGrassR(11, 2)
        ];
    }


    // jsdoc
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassR(2, 0), new GrassL(12, 0),
            new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    // jsdoc
    setCoins() {
        this.coins = [
            new Coin(1.25, 1.125), new Coin(13.25, 1.125)
        ];
    }


    // jsdoc
    setCrystals() {
        this.crystals = [
            new Crystal(7.25, 3.125)
        ];
    }


    // jsdoc
    setHitPoints() {
        this.hitPoints = [
            new HitPoint(3.25, 3.125), new HitPoint(4.25, 3.125), new HitPoint(5.25, 3.125), new HitPoint(9.25, 3.125),
            new HitPoint(10.25, 3.125), new HitPoint(11.25, 3.125)
        ];
    }


    setEnemies() {
        return [
            new Spider(1.25, 0.1875)
        ];
    }
}