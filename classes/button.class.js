class Button extends DrawableObject {
    indent = 4;
    reachable = true;
    targeted = false;
    selected = false;
    locked = false;


    constructor(path, x, y, z) {
        super(path, x, y, z);
    }


    isReachable() {
        return this.reachable == true;
    }


    isActivated() {
        return this.isTargeted() || this.isLocked();
    }


    isTargeted() {
        return this.targeted == true || this.selected == true;
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