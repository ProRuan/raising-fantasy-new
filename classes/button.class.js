class Button extends DrawableObject {
    indent = 4;
    targeted = false;
    locked = false;


    constructor(path, x, y) {
        super(path, x, y);
    }


    isActivated() {
        return this.isTargeted() || this.isLocked();
    }


    isTargeted() {
        return this.targeted == true;
    }


    isLocked() {
        return this.locked == true;
    }




    // class Path
    // sub classes AudioPath + ImagePath ...


    // audioPath = new AudioPath();
    // dino.sound = audioPath.dinoGrowl
    // ...
}