class Knight extends MoveableObject {


    currentChapter = 'cover';
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
            if (isKey('keyQ')) {
                this.setOtherDirection(true);
            }
            if (isKey('keyE')) {
                this.setOtherDirection(false);
            }


            if (this.world.keyboard.arrowLeft.keydown) {
                this.move(false);
            }
            if (this.world.keyboard.arrowRight.keydown) {
                this.move(true);
            }
            if (this.world.keyboard.keyA.keydown) {

            }

            this.setCurrentChapter();

            // this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28
        }, 1000 / 60);


        setInterval(() => {
            this.playCurrentAnimation();
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


    setCurrentChapter() {
        this.currentChapter = this.getCurrentChapter();
    }


    getCurrentChapter() {
        for (let i = 0; i < this.chapters.length; i++) {
            let condition = this.getCurrentCondition(i);
            if (this.isChapter(condition)) {
                return this.chapters[i];
            }
        }
    }


    getCurrentCondition(i) {
        let condition = this.chapters[i];
        let initial = condition[0];
        return condition.replace(initial, 'is' + initial.toUpperCase());
    }


    isChapter(condition) {
        return this[condition]();
    }


    playCurrentAnimation() {
        this.playAnimation(this.flipBook[this.currentChapter]);
    }
}