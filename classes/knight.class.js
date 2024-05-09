class Knight extends MoveableObject {


    constructor(x, y) {
        super(IMAGE_KNIGHT, x, y);
        this.setCover();
        this.setFlipBook(FLIP_BOOK_KNIGHT);
        this.loadImages();
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


    setCover() {
        this.cover = this.img.src;
    }


    setImages() {
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            chapter.forEach((c) => {
                let img = new Image();
                img.src = c;
                this.imageCache[c] = img;
            })
        }
    }


    animate() {
        setInterval(() => {
            // only for testing!!!
            if (this.world.keyboard.keyQ.keydown) {
                this.otherDirection = true;
            }
            if (this.world.keyboard.keyE.keydown) {
                this.otherDirection = false;
            }


            if (this.world.keyboard.arrowLeft.keydown) {
                this.move(false);
            }
            if (this.world.keyboard.arrowRight.keydown) {
                this.move(true);
            }
            if (this.world.keyboard.keyA.keydown) {

            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.world.keyboard.arrowLeft.keydown || this.world.keyboard.arrowRight.keydown) {
                this.playAnimation(this.flipBook.walk);
            } else if (this.world.keyboard.keyA.keydown) {
                this.playAnimation(this.flipBook.attack);
            } else {
                this.img.src = this.cover;
            }
        }, 100);
    }

    isWalking(key) {
        if (this.world.keyboard[key].keydown) {
            return true;
        }
    }
}