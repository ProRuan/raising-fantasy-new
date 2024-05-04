class Button extends DrawableObject {
    indent = 4;
    targeted = false;
    locked = false;


    constructor(path, x, y, z) {
        super(path, x, y, z);
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


    updateCursor() {
        setInterval(() => {
            (this.isTargeted()) ? setCursor('pointer') : false;
        }, 1000 / 60);
    }




    // class Path
    // sub classes AudioPath + ImagePath ...


    // audioPath = new AudioPath();
    // dino.sound = audioPath.dinoGrowl
    // ...
}