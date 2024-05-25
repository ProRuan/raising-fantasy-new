class MagicObject extends AnimatedObject {
    otherDirection = true;
    inTouch = false;
    collided = false;


    // jsdoc
    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    get body() {
        return {
            'xLeft': this.x + this.bodyXY.xLeft,
            'xCenter': this.x + this.bodyXY.xCenter,
            'xRight': this.x + this.bodyXY.xRight,
            'yTop': this.y + this.bodyXY.yTop,
            'yCenter': this.y + this.bodyXY.yCenter,
            'yBottom': this.y + this.bodyXY.yBottom
        };
    }
}