class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 36, xRight: 424, yTop: 52, yBottom: 76 };
    nextThrow = 0;
    thrown = false;
    throwDone = true;
    webBroken = false;    // necessary?


    // jsdoc
    constructor(x, y) {
        super(source.spider, x, y);
        this.setStateValues(60, 80);
        this.setThrowMax();
        this.setAct('throw');
        this.animate();
    }


    // jsdoc
    setThrowMax() {
        this.throwMaxRight = this.getThrowMax(false, 'xRight');
        this.throwMaxLeft = this.getThrowMax(true, 'xLeft');
    }


    // jsdoc
    getThrowMax(value, key) {
        this.otherDirection = value;
        return this.weapon[key];
    }


    throw() {
        this.track();

        if (this.isThrowMax(this.web, true) || this.isThrowMax(this.web, false)) {
            delete this.web;
            this.thrown = false;
            this.nextThrow = 500 + getTime();
        } else if (!isUndefined(this.web) && isTrue(this.web.collided) && this.isFinalImage(this.web) && !isTrue(this.webBroken)) {
            this.webBroken = true;
            setTimeout(() => {
                delete this.web;
                this.thrown = false;
                this.nextThrow = 500 + getTime();
                this.webBroken = false;
            }, 100 / 3);
        } else if (super.isAttack() && !isTrue(this.thrown) && isLarger(this.nextThrow, world.time)) {
            this.thrown = true;
            this.throwDone = false;
            setTimeout(() => {
                this.throwDone = true;
            }, this.flipBook.attack.length * 100);

            if (isTrue(this.otherDirection)) {
                this.web = new Web((this.weapon.xRight - 24), (this.weapon.yBottom + 32));    // oDir true (left end)
            } else {
                this.web = new Web((this.weapon.xLeft - 4), (this.weapon.yBottom + 32));    // oDir true (left end)
            }


            this.web.otherDirection = this.otherDirection;

            // for class Web!!!
            // world.webs[0].img.src = world.webs[0].flipBook[2];
        }
    }


    // jsdoc
    track() {
        let thisX = this.body.xCenter;
        let heroX = world.hero.body.xCenter;
        this.otherDirection = (!isLarger(thisX, heroX)) ? true : false;
    }


    // jsdoc
    isThrowMax(web, logical) {
        if (isTrue(logical)) {
            return this.isWebExisting(web, true) && isLarger(web.x, this.throwMaxLeft);
        } else if (!isTrue(logical)) {
            return this.isWebExisting(web, false) && isLarger(this.throwMaxRight, web.x + web.width);
        }
    }


    // jsdoc
    isWebExisting(web, logical) {
        if (isTrue(logical)) {
            return !isUndefined(web) && isTrue(web.otherDirection);
        } else if (!isTrue(logical)) {
            return !isUndefined(web) && !isTrue(web.otherDirection);
        }
    }


    isFinalImage(web) {    // double code?!?
        return web.img.src.includes('web5');
    }


    isAttack() {
        return super.isAttack() && !isTrue(this.throwDone);
    }


    isWalk() {    // to edit!
        return false;
    }




    // ideas
    // -----

    // Save web at object spider (not at level world) ...

    // super.isEpilog(value) + this.isEpilog() --> super.isEpilog('web5')
    // super.effect(value) + this.effect
}