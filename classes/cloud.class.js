class Cloud extends DrawableObject {


    // jsdoc
    constructor(x) {
        super(SOURCE.cloud, x, 0);
        this.setSpeed(4);
        this.move(() => this.floatPermanently());
    }
}