class Bomb extends AnimatedObject {
    collided = false;


    constructor(x, y) {
        super(source.bomb, x, y);
        this.splitFlipBook();
        // this.move(() => this.throw());
    }


    // jsdoc
    splitFlipBook() {
        this.flipBook.throw = this.getPages(0, 4);
        this.flipBook.burst = this.getPages(4, 11);
        this.flipBook.epilog = this.getEpilog();
    }


    // jsdoc
    getEpilog() {
        return [getLastElement(this.flipBook)];
    }


    throw() {
        console.log(this.img.src);
    }


    playAnimation() {
        if (this.isImage('bomb11')) {
            super.playAnimation(this.flipBook.epilog);
            this.setRemoveable();
        } else if (this.collided) {
            if (!this.currentImageReseted) {
                this.currentImageReseted = true;
                this.currentImage = 0;
            }
            super.playAnimation(this.flipBook.burst);
        } else if (!this.collided) {
            super.playAnimation(this.flipBook.throw);
        }
        console.log(this.img.src);
    }




    // tasks
    // -----
    // magic soung (cast + hit) ...
    // think about getter body() --> get () --> return getBody() ...
    // set firstAngerX (world.hero.x) ...
    // shaman hurt bomb ...
    // double code (this.magic)!!!
    // set endboss animation
    // set endboss battle trigger
    // set final scene
}