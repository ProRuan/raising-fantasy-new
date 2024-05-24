class Bird extends AnimatedObject {


    constructor(x, y) {
        super(source.bird, x, y);
        this.setSpeed(32);
    }


    animate() {
        this.setStoppableInterval(() => this.floatPermanently(), 1000 / 60);
        this.setStoppableInterval(() => this.playAnimation(), 100);
    }
}