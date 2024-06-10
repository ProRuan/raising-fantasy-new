class Crystal extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.crystal, x, y);
    }


    // jsdoc
    triggerEffect() {
        this.release();
        this.stop(true);
    }


    // jsdoc
    release() {
        world.hero.bombUnlocked = true;
        world.hero.xStopRight = source.endX;
        world.hero.xStopLeft = source.crystalCollectedX;
        world.hero.soundUpgrade();
    }
}