class MoveableObject extends DrawableObject {


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    move(locigal) {
        (locigal) ? this.moveRight() : this.moveLeft();
    }


    moveLeft() {
        if (keyboard.arrowLeft.keydown) {
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
            this.x += this.speed;
        }
        // if (keyboard.arrowRight.doubleClick && keyboard.arrowRight.keydown) {
        //     this.x += this.speedRun;
        // } else if (keyboard.arrowRight.keydown) {
        //     this.x += this.speed;
        // }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}