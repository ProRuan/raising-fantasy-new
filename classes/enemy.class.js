class Enemy extends MoveableObject {
    otherDirection = true;


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setFlipBook(source);
        this.setCover(source);
        this.loadImages();
    }


    // jsdoc
    get radDispl() {
        return this.radDispl;
    }


    // jsdoc
    get body() {
        return {
            'xLeft': this.getOffset('x', 'offsetX', 'left'),
            'xCenter': this.getOffset('x', 'offsetX', 'center'),
            'xRight': this.getOffset('x', 'offsetX', 'right'),
            'yTop': this.getOffset('y', 'offsetY', 'top'),
            'yCenter': this.getOffset('y', 'offsetY', 'center'),
            'yBottom': this.getOffset('y', 'offsetY', 'bottom')
        }
    }


    // jsdoc
    getOffset(axis, key, subkey) {
        return this[axis] + this[key][subkey];
    }
}