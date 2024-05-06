class AvatarInfo extends DrawableObject {


    constructor(o) {
        super(o.path, o.x, o.y);
        this.setTranslation(o.x);
    }


    setTranslation(x) {
        this.translation = x;
    }
}