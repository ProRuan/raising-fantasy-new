/**
 * Represents a section 7.
 */
class Section7 {


    /**
     * Creates a section 7.
     */
    constructor() {
        this.setFlyGrass();
        this.setGrass();
        this.setCoins();
        this.setCrystals();
        this.setHearts();
        this.setEnemies();
    }


    /**
     * Sets the flying grass of section 7.
     */
    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(3, 2), new FlyGrassC(4, 2), new FlyGrassC(5, 2), new FlyGrassC(6, 2),
            new FlyGrassC(7, 2), new FlyGrassC(8, 2), new FlyGrassC(9, 2), new FlyGrassC(10, 2),
            new FlyGrassR(11, 2)
        ];
    }


    /**
     * Sets the grass of section 7.
     */
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassR(2, 0), new GrassL(12, 0),
            new GrassC(13, 0), new GrassC(14, 0)
        ];
    }


    /**
     * Sets the coins of section 7.
     */
    setCoins() {
        this.coins = [
            new Coin(13.25, 1.125)
        ];
    }


    /**
     * Sets the crystals of section 7.
     */
    setCrystals() {
        this.crystals = [
            new Crystal(7.25, 3.125)
        ];
    }


    /**
     * Sets the hearts of section 7.
     */
    setHearts() {
        this.hearts = [
            new Heart(5.25, 3.125), new Heart(9.25, 3.125)
        ];
    }


    /**
     * Sets the enemies of section 7.
     */
    setEnemies() {
        this.enemies = [
            new Spider(1, 0.1875)
        ];
    }
}