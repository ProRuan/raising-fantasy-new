class MoveableObject extends DrawableObject {
    // directory = 'img/characters/knight/';
    cover;
    flipBook;
    currentImage = 0;


    // to check

    // speed = 0.15;
    // otherDirection = false;
    // speedY = 0;
    speedJump = 10;
    speedHighJump = 13;
    acceleration = 0.5;
    jumpHeightMax = 540;
    grounded = true;
    // energy = 100;
    // lastHit = 0;

    radDispl = 0;
    radDisplAttack = 0;


    // TO EDIT!!!


    constructor(path, x, y) {
        super(path, x, y);    // anpassen!!!
        this.setCover(name);
        this.loadImage(this.cover);
    }


    climb(locigal) {
        (locigal) ? this.y -= this.speed : this.y += this.speed;
    }


    playAnimation(flipBook) {
        if (this instanceof Knight && this.currentFlipBook != flipBook) {
            if (!this.isSimilarFlipBook(flipBook)) {
                this.currentImage = 0;
            }
            this.currentFlipBook = flipBook;
            // console.log('changed flip book', this.currentImage);
        }
        if (this instanceof Knight && flipBook != FLIP_BOOK_HERO.IDLE) {
            world.hero.lastIdle = new Date().getTime();
            // console.log('updated idle delay');
        }
        let i = this.currentImage % flipBook.length;
        let path = flipBook[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        // if (this instanceof Knight) {
        //     console.log(this.img);
        // }


        // let i = this.currentImage % images.length;
        // let path = images[i];
        // this.img = this.imageCache[path];
        // this.currentImage++;
    }


    playAnimationOnce(flipBook) {
        this.currentImage = 0;
        for (let i = 0; i < flipBook.length; i++) {
            setTimeout(() => {
                this.playAnimation(flipBook);
                // console.log(this.img, new Date().getTime());
            }, i * 100);
        }
    }


    playAnimationIdle(flipBook) {
        this.currentImage = 0;
        for (let i = 0; i < flipBook.length; i++) {
            setTimeout(() => {
                this.playAnimation(flipBook);
                console.log(this.img, new Date().getTime());
            }, i * (1000 / 6));
        }
    }




    // to check

    applyGravity() {
        setInterval(() => {
            if (!this.climbing) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this.y > this.groundLevel - (this.yBottom - this.y)) {
                        // console.log(this.y);
                        this.y = this.groundLevel - (this.yBottom - this.y);
                    }
                } else {
                    this.speedY = 0;
                }
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        return this.yBottom < this.groundLevel || !this.grounded;
    }


    jump() {
        this.speedY = 12.5;    // jump height 160
        this.isJumpStart = true;
        this.isJumping = true;
        this.isFallStart = true;
        this.isFalling = true;
    }


    playAnimationJumpStart(flipBook) {
        let path = flipBook[0];
        this.img = this.imageCache[path];
        setTimeout(() => {
            path = flipBook[1];
            this.img = this.imageCache[path];
        }, 100);
    }


    playAnimationFallStart(flipBook) {
        let path = flipBook[3];
        this.img = this.imageCache[path];
        setTimeout(() => {
            path = flipBook[4];
            this.img = this.imageCache[path];
        }, 100);
    }


    removeDeadEnemies() {
        setInterval(() => {
            let enemy = world.ENEMIES.find(e => e.dead && !e.removing);
            if (enemy) {
                enemy.removing = true;
                setTimeout(() => {
                    let id = world.ENEMIES.indexOf(enemy);
                    world.ENEMIES.splice(id, 1);
                }, 3000);
            }
        }, 1000 / 60);
    }


    isSimilarFlipBook(flipBook) {
        let caseRunAttack = this.currentFlipBook == this.flipBook.RUN_ATTACK && flipBook == this.flipBook.RUN;
        let caseRun = this.currentFlipBook == this.flipBook.RUN && flipBook == this.flipBook.RUN_ATTACK;
        let caseWalkAttack = this.currentFlipBook == this.flipBook.WALK_ATTACK && flipBook == this.flipBook.WALK;
        let caseWalk = this.currentFlipBook == this.flipBook.WALK && flipBook == this.flipBook.WALK_ATTACK;
        return caseRunAttack || caseRun || caseWalkAttack || caseWalk;
    }
}