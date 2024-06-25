/**
 * Represents a section 5.
 */
class Section5 {


    /**
     * Creates a section 5.
     */
    constructor() {
        this.setTrees();
        this.setLeaves();
        this.setFlyGrass();
        this.setGrass();
        this.setCoins();
        this.setHitPoints();
    }


    /**
     * Sets the trees of section 5.
     */
    setTrees() {
        this.trees = [
            new Tree(5.5, 2)
        ];
    }


    /**
     * Sets the leaves of section 5.
     */
    setLeaves() {
        this.leaves = [
            new Leaf(6.625, 4, 4), new Leaf(7.25, 4.5, 4), new Leaf(7.75, 4, 4)
        ];
    }


    /**
     * Sets the flying grass of section 5.
     */
    setFlyGrass() {
        this.flyGrass = [
            new FlyGrassL(5, 2), new FlyGrassC(6, 2), new FlyGrassC(7, 2), new FlyGrassC(8, 2),
            new FlyGrassR(9, 2), new FlyGrassL(11, 4), new FlyGrassC(12, 4), new FlyGrassC(13, 4),
            new FlyGrassC(14, 4)
        ];
    }


    /**
     * Sets the grass of section 5.
     */
    setGrass() {
        this.grass = [
            new GrassC(0, 0), new GrassC(1, 0), new GrassC(2, 0), new GrassR(3, 0)
        ];
    }


    /**
     * Sets the coins of section 5.
     */
    setCoins() {
        this.coins = [
            new Coin(3.25, 1.125), new Coin(11.25, 5.125)
        ];
    }


    /**
     * Sets the hit points of section 5.
     */
    setHitPoints() {
        this.hitPoints = [
            new HitPoint(5.25, 3.125), new HitPoint(9.25, 3.125), new HitPoint(13.75, 5.125)
        ];

    }
}