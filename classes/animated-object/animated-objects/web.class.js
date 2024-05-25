class Web extends AnimatedObject {
    radDispl = 32;
    speed = 2;
    thrown = false;
    collided = false;
    chapter = 'prolog';


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.web, x / UNIT, y / UNIT);
        this.setParameters(otherDirection);
        this.splitFlipBook();
        this.move(() => this.throw());
    }


    // jsdoc
    setParameters(otherDirection) {
        this.otherDirection = otherDirection;
        this.speed = (otherDirection) ? -this.speed : this.speed;
    }


    // jsdoc
    splitFlipBook() {
        this.flipBook.prolog = this.getPages(0, 1);
        this.flipBook.growth = this.getPages(1, 2);
        this.flipBook.throw = this.getPages(2, 3);
        this.flipBook.hit = this.getPages(3, 4)
        this.flipBook.epilog = this.getPages(4, 5);
    }


    // jsdoc
    getPages(i, max) {
        let pages = [];
        this.addPages(i, max, pages);
        return pages;
    }


    // jsdoc
    addPages(i, max, pages) {
        for (; i < max; i++) {
            let page = this.flipBook[i];
            pages.push(page);
        }
    }


    throw() {
        this.x += this.speed;
        this.verifyCollision();
    }


    // jsdoc
    verifyCollision() {
        if (isCollided(world.hero.body, this)) {
            this.collided = true;
        }
    }


    // jsdoc
    playAnimation() {
        if (isMatch(this.chapter, 'epilog')) {
            this.playWebThrow(this.chapter);
        } else if (isTrue(this.collided)) {
            this.playWebThrow('hit', 'epilog');
        } else if (isMatch(this.chapter, 'throw')) {
            this.playWebThrow(this.chapter);
        } else if (isMatch(this.chapter, 'growth')) {
            this.playWebThrow(this.chapter, 'throw');
        } else if (isMatch(this.chapter, 'prolog')) {
            this.playWebThrow(this.chapter, 'growth');
        }
    }


    // jsdoc
    playWebThrow(chapter, next) {
        super.playAnimation(this.flipBook[chapter]);
        if (next) {
            this.chapter = next;
        }
    }
}