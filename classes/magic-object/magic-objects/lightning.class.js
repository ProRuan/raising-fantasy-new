class Lightning extends MagicObject {
    radDispl = 260;
    pages = { move: 2, collided: 8, epilog: 9 };
    bodyXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };
    loadXY = { xLeft: 120, xCenter: 128, xRight: 136, yTop: 180, yCenter: 128, yBottom: 226 };
    lightningXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };


    constructor(x, y, otherDirection) {
        super(source.lightning, x, y);
        this.setMagic(otherDirection, 40, 'lightning8');

        this.bodyXY = this.lightningXY;
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
            this.x = world.hero.body.xCenter - (this.body.xCenter - this.x);
            this.y = world.hero.y - 210;
            if (isUndefined(this.waiting)) {
                this.waiting = false;
                setTimeout(() => {
                    this.searching = false;
                    this.waiting = true;
                }, 3000);
            }
        }


        // console.log(world.hero.y, this.y, world.hero.y - this.y);
        // console.log(world.hero.body.yBottom, this.body.yBottom, world.hero.body.yBottom - this.body.yBottom);
        // console.log(this.searching, this.waiting, this.loading);
    }


    // class Lightning ...
    // class MagicObject ...
    // class Shaman ...
    // './img' --> 'img' ...
    // magic soung (cast + hit) ...
}