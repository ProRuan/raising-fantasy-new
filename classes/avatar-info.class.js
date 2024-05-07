class AvatarInfo extends DrawableObject {


    // jsdoc
    constructor(o) {
        super(o.path, o.x, o.y);
        this.setTranslation(o.x);
    }


    // jsdoc
    setTranslation(x) {
        this.translation = x;
    }
}