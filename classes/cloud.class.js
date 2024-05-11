class Cloud extends DrawableObject {


    // jsdoc
    constructor(x) {
        super(source.cloud, x * canvas.width, 0);
        this.setSpeed(4);
        this.move(() => this.floatPermanently());
    }
}