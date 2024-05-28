class Lightning extends MagicObject {
    radDispl = 260;
    pages = { move: 2, collided: 8, epilog: 9 };
    bodyXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };
    loadXY = { xLeft: 120, xCenter: 128, xRight: 136, yTop: 180, yCenter: 203, yBottom: 226 };
    lightningXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };    // frame -1 or +1


    constructor(x, y, otherDirection) {
        super(source.lightning, x, y);
        this.setMagic(otherDirection, 40, 'lightning8');

        this.bodyXY = this.loadXY;
        this.searching = true;
    }


    move() {
        if (isTrue(this.waiting)) {
            if (isUndefined(this.loading)) {
                this.loading = false;
                setTimeout(() => {
                    this.waiting = false;
                    this.loading = true;
                    this.bodyXY = this.lightningXY;
                    this.y += 96;
                    this.collided = true;
                }, 3000);
            }
        }
        if (isTrue(this.searching)) {
            this.x = this.getHeroX();
            this.y = this.getHeroY();
            if (isUndefined(this.waiting)) {
                this.waiting = false;
                setTimeout(() => {
                    this.searching = false;
                    this.waiting = true;
                }, 3000);
            }
        }
    }


    // jsdoc
    getHeroX() {
        return world.hero.body.xCenter - (this.body.xCenter - this.x);
    }


    getHeroY() {
        return world.hero.y - 210;    // variable???
    }


    // class Lightning ...
    // class MagicObject ...
    // class Shaman ...
    // './img' --> 'img' ...
    // magic soung (cast + hit) ...
}