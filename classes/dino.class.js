class Dino extends MoveableObject {
    otherDirection = true;


    constructor(x, y) {
        super(source.dino, x, y);
        this.setFlipBook(source.dino);
        this.setCover(source.dino);

        this.setCurrentImage(0);
        this.setImageCache();
        // this.setImages();

        // this.loadImages();
    }


    get offsetX() {
        return {
            'left': this.x + 4,
            'center': this.x + 52,
            'right': this.x + 100
        }
    }


    get offsetY() {
        return {
            'top': this.y + 43,
            'center': this.y + 65,
            'bottom': this.y + 87
        }
    }


    get xLeft() {
        return this.x + 4;
    }


    get xCenter() {
        return this.x + 52;
    }


    get xRight() {
        return this.x + 100;
    }


    get yTop() {
        return this.y + 43;
    }


    get yCenter() {
        return this.y + 65;
    }


    get yBottom() {
        return this.y + 87;
    }


    get radDispl() {
        return this.width - (this.xCenter - this.x) + 28;    // hero xLeft???
    }


    get attackRange() {
        return {
            'left': this.x + 96,
            'right': this.x + 124,
            'top': this.y + 52,
            'bottom': this.y + 80
        }
    }


    get xLeftAttack() {
        return this.x + 96;
    }


    get xRightAttack() {
        return this.x + 124;
    }


    get yTopAttack() {
        return this.y + 52;
    }


    get yBottomAttack() {
        return this.y + 80;
    }
}