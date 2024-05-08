class Leaf extends DrawableObject {
    indent = 4;
    pattern = /leaf(\d+)/;


    // jsdoc
    constructor(x, y, i) {
        super(SOURCE.leaf, x * UNIT, y * UNIT);
        this.setLeafType(i);
    }


    // jsdoc
    setLeafType(i) {
        this.img.src = this.getPath(i);
    }


    // jsdoc
    getPath(i) {
        return this.img.src.replace(this.pattern, `leaf${i}`);
    }
}