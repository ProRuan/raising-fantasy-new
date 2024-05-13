class MoveableObject extends DrawableObject {
    otherDirection = false;
    sounds = [];


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    move(logical, key) {
        this.setOtherDirection(logical);
        this.addSpeed(logical, key);
    }


    // jsdoc
    setOtherDirection(logical) {
        this.otherDirection = logical;
    }


    // jsdoc
    addSpeed(logical, key) {
        if (isKey(key, 'doubleClick')) {
            this.addSpeedType(logical, 'runSpeed');
        } else if (isKey(key)) {
            this.addSpeedType(logical, 'speed');
        }
    }


    // jsdoc
    addSpeedType(logical, key) {
        this.x += (logical) ? -this[key] : this[key];
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playSound(path) {    // set sound volume factor!!!
        let sound = new Audio(path);
        this.sounds.push(sound);
        sound.play();
    }
}