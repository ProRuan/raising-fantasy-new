class Knight extends MoveableObject {


    currentChapter = 'cover';
    conditions = ['isWalkAttack', 'isWalk', 'isAttack', 'isCover'];
    chapters = ['walkAttack', 'walk', 'attack', 'cover'];



    constructor(x, y) {
        super(source.knight, x, y);
        this.setFlipBook(FLIP_BOOK_KNIGHT);
        this.setCover();
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
        this.flipBook['cover'] = [this.img.src];
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

            this.currentChapter = this.getCurrentChapter();

            // this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.flipBook[this.currentChapter]);

            console.log(this.img.src);
        }, 100);
    }


    isRunAttack() {
        return this.isRun() && this.isAttack();
    }


    isRun() {
        return isKey('arrowLeft', 'doubleClick') || isKey('arrowRight', 'doubleClick');
    }


    isWalkAttack() {
        return this.isWalk() && this.isAttack();
    }


    isWalk() {
        return isKey('arrowLeft') || isKey('arrowRight');
    }


    isAttack() {
        return isKey('keyA');
    }


    isCover() {
        return true;
    }


    getCurrentChapter() {
        for (let i = 0; i < this.conditions.length; i++) {
            if (this[this.conditions[i]]()) {
                return this.chapters[i];
            }
        }
    }
}