class MoveableObject extends DrawableObject {
    otherDirection = false;
    sounds = [];


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    move(locigal) {
        (locigal) ? this.moveRight() : this.moveLeft();
    }


    moveLeft() {
        if (keyboard.arrowLeft.keydown) {
            this.otherDirection = true;
            this.x -= this.speed;
        }
        // if (keyboard.arrowLeft.doubleClick && keyboard.arrowLeft.keydown) {
        //     this.x -= this.speedRun;
        // } else if (keyboard.arrowLeft.keydown) {
        //     this.x -= this.speed;
        // }
    }


    moveRight() {
        if (keyboard.arrowRight.keydown) {
            this.otherDirection = false;
            this.x += this.speed;
        }
        // if (keyboard.arrowRight.doubleClick && keyboard.arrowRight.keydown) {
        //     this.x += this.speedRun;
        // } else if (keyboard.arrowRight.keydown) {
        //     this.x += this.speed;
        // }
    }


    setOtherDirection(logical) {
        this.otherDirection = logical;
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