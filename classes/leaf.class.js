class Leaf extends DrawableObject {
    indent = 4;
    pattern = /leaf(\d+)/;


    // jsdoc
    constructor(x, y, i) {
        super(source.leaf, x * UNIT, y * UNIT);
        this.setId();
        this.setLeafType(i);
        this.setSound();
    }


    // jsdoc
    setId() {
        this.id = this.getId();
    }


    // jsdoc
    getId() {
        return counter.leaf++;
    }


    // jsdoc
    setLeafType(i) {
        this.img.src = this.getPath(i);
    }


    // jsdoc
    getPath(i) {
        return this.img.src.replace(this.pattern, `leaf${i}`);
    }


    // jsdoc
    setSound() {
        this.sound = source.leaf.sound;
    }
}