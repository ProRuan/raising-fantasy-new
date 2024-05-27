class Fire extends MagicObject {
    radDispl = 248;
    speedXY = { x: 128, y: 64 };    // to set!
    pages = { move: [0, 3], collided: [3, 9], epilog: [9, 10] };
    bodyXY = { xLeft: 108, xCenter: 124, xRight: 140, yTop: 120, yCenter: 128, yBottom: 136 };


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.fire, x, y);

        this.setMagic(otherDirection, 30, 'fire9');
        this.startX = this.body.xLeft;
        this.endX = this.startX - 376;
        this.setSpeed(this.speedXY.x, 0, this.speedXY.y);
    }


    // Think about setSpeed() of Blade and MagicObject!!!


    // to edit!!!
    move() {
        if (!isTrue(this.collided)) {
            this.x -= this.speed;

            if (isGreater(this.endX, this.body.xRight)) {
                if (this.y + 128 < world.hero.body.yCenter) {
                    if (this.y + 128 > world.hero.body.yCenter) {
                        this.y = world.hero.body.yCenter - 128;
                    } else {
                        this.y += this.speedY;
                    }
                }


                if (this.y + 128 > world.hero.body.yCenter) {
                    if (this.y + 128 < world.hero.body.yCenter) {
                        this.y = world.hero.body.yCenter - 128;
                    } else {
                        this.y -= this.speedY;
                    }
                }


                console.log(this.y, this.body.yCenter, this.body.yCenter - this.y);
            }
        }
    }


    // class Fire ...
    // class Blade ...
    // class MagicObject ...
    // class Shaman ...
    // './img' --> 'img' ...
    // speedXY + pagesXY ...
}