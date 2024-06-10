class Leaf extends DrawableObject {
    indent = 4;
    pattern = /leaf(\d+)/;


    // jsdoc
    constructor(x, y, i) {
        super(source.leaf, x * UNIT, y * UNIT);
        this.setLeafType(i);
        this.setSound();
    }


    // jsdoc    // double code!!!
    getId(key) {
        return world[key].findIndex(o => o == this);
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
    triggerEffect() {
        world.hero.leaves++;
        this.clear();
    }


    // as audio now!?!
    setSound() {
        this.sound = source.leaf.sound;
    }
}