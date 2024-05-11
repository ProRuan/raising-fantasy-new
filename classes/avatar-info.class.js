class AvatarInfo extends DrawableObject {


    // jsdoc
    constructor(source) {
        super(source, source.x, source.y);
        this.setTranslation(source.x);
    }


    // jsdoc
    setTranslation(x) {
        this.translation = x;
    }
}