class Section1 {


    // jsdoc
    constructor() {
        this.setGrass();
        this.setCoins();
    }


    // jsdoc
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassC(2, 0), new GrassC(3, 0),
            new GrassC(4, 0), new GrassC(5, 0), new GrassC(6, 0), new GrassC(7, 0),
            new GrassC(8, 0), new GrassC(9, 0), new GrassC(10, 0), new GrassC(11, 0),
            new GrassC(12, 0), new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    // jsdoc
    setCoins() {
        this.coins = [
            new Coin(9.25, 1.125), new Coin(10.25, 1.125), new Coin(11.25, 1.125)
        ];
    }
}