class Knight extends MoveableObject {


    // only for testing!!!
    currentChapter;
    // swordDraw = source.swordDraw;


    constructor(x, y) {
        super(source.knight, x, y);
        this.setCover();
        this.setFlipBook(FLIP_BOOK_KNIGHT);
        this.loadImages();
        this.setSpeed(128, 256);
        this.setChapters();
        this.animate();

        console.log('Knight: ', this);
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


    setChapters() {
        this.chapters = [
            this.flipBook['runAttack'], this.flipBook['run'], this.flipBook['walkAttack'], this.flipBook['walk'], this.flipBook['attack']
        ];
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


            this.setConditions();
            this.setCurrentChapter();


            // this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28
        }, 1000 / 60);


        setInterval(() => {
            this.playCurrentChapter();

            // this.playAnimationSuper();
            // this.knightAnimator = new KnightAnimator(this);

            // if (this.world.keyboard.arrowLeft.keydown || this.world.keyboard.arrowRight.keydown) {
            //     this.playAnimation(this.flipBook.walk);
            // } else if (this.world.keyboard.keyA.keydown) {
            //     this.playAnimation(this.flipBook.attack);
            // } else {
            //     this.img.src = this.cover;
            // }
        }, 100);
    }


    setConditions() {
        this.conditions = [
            this.isRunAttack(), this.isRun(), this.isWalkAttack(), this.isWalk(), this.isAttack()
        ];
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


    setCurrentChapter() {
        for (let i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i]) {
                this.currentChapter = this.chapters[i];
                return true;
            }
        }
        return false;
    }


    playCurrentChapter() {
        if (this.setCurrentChapter()) {
            this.playAnimation(this.currentChapter);
        } else {
            this.img.src = this.cover;
        }
        // console.log(this.img.src);
    }


    playAnimationSuper() {
        for (let i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i]) {
                this.playAnimation(this.chapters[i]);
                console.log(this.img.src);
                return true;
            }
        }
        this.img.src = this.cover;
        return false;
    }


    playSwordDraw() {
        if (this.img.src.includes('/attack2')) {
            this.playSound(this.swordDraw);
        }
    }
}