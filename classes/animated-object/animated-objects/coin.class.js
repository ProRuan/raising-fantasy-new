class Coin extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.coin, x, y);
    }


    // jsdoc
    triggerEffect() {
        world.hero.coins++;
        this.clear();
    }
}