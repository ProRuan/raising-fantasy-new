class Knight extends MoveableObject {
    

    constructor(x, y) {
        super(IMAGE_KNIGHT, x, y);
        this.setFlipBook(FLIP_BOOK_KNIGHT);
        this.setSpeed(128, 256);
        this.animate();
    }


    get xLeft() {
        return this.x + 28
    }


    get xCenter() {
        return this.x + 44
    }


    get xRight() {
        return this.x + 60;
    }


    get yTop() {
        return this.y + 62;
    }


    get yCenter() {
        return this.y + 86;
    }


    get yBottom() {
        return this.y + 110;
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.arrowLeft.keydown) {
                this.move(false);
            } else if (this.world.keyboard.arrowRight.keydown) {
                this.move(true);
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.world.keyboard.arrowLeft.keydown || this.world.keyboard.arrowRight.keydown) {
                this.playAnimation(this.flipBook.walk);
            }
        }, 100);
    }
}