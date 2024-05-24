class Crystal extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.crystal, x, y);
    }


    // jsdoc
    triggerEffect() {
        world.hero.bombUnlocked = true;
        world.hero.xStopLeft = source.crystalCollectedX;    // variable!!!
        world.hero.xStopRight = source.endX;    // variable!!!
    }
}