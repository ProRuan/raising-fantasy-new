class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 36, xRight: 424, yTop: 52, yBottom: 76 };
    damage = { trigger: 'attack3', value: 0, time: 0 };
    nextThrow = 0;
    throwDelay = 500;
    thrown = false;
    throwDone = true;
    webBroken = false;
    ableToFight = false;


    // jsdoc
    constructor(x, y) {
        super(source.spider, x, y);
        this.setEnemy(60, 80, 'throw');
    }


    // jsdoc
    setThrowMax() {
        if (isUndefined(this.throwMaxRight)) {
            this.throwMaxRight = this.getThrowMax(false, 'xRight');
            this.throwMaxLeft = this.getThrowMax(true, 'xLeft');
        }
    }


    // jsdoc
    throw() {
        this.setThrowMax();
        this.track();
        this.trigger();
    }


    // jsdoc
    getThrowMax(value, key) {
        this.otherDirection = value;
        return this.weapon[key];
    }


    // jsdoc
    track() {
        let thisX = this.body.xCenter;
        let heroX = world.hero.body.xCenter;
        this.otherDirection = (!isGreater(thisX, heroX)) ? true : false;
    }


    trigger() {
        if (this.isThrowTimeout()) {
            this.resetThrowParameters();
        } else if (this.throwResetTime && isGreater(this.throwResetTime, world.time)) {
            this.resetThrowParameters();
            this.webBroken = false;
            this.nextThrow = world.time + 1000;
            delete this.throwResetTime;
        } else if (this.isWebBurst()) {
            this.processWebBurst();
        } else if (this.throwDoneTime && isGreater(this.throwDoneTime, world.time)) {
            this.throwDone = true;
            delete this.throwDoneTime;
        } else if (this.isThrowTime()) {
            this.processWebThrow();
            this.setWeb();
        }
    }


    // jsdoc
    isThrowTimeout() {
        return this.isThrowMax(this.web, true) || this.isThrowMax(this.web, false);
    }


    // jsdoc
    isThrowMax(web, logical) {
        if (isTrue(logical)) {
            return this.isWebExisting(web, true) && isGreater(web.x, this.throwMaxLeft);
        } else if (!isTrue(logical)) {
            return this.isWebExisting(web, false) && isGreater(this.throwMaxRight, web.x + web.width);
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


    // jsdoc
    resetThrowParameters() {
        this.removeWeb();
        this.thrown = false;
        this.nextThrow = getSum(this.throwDelay, getTime());
    }


    removeWeb() {    // double code (bomb and 3 x magic)!?! 
        this.web.stop(true);
        delete this.web;
    }


    // jsdoc
    isWebBurst() {
        return this.isWebHit() && this.isWebBroken();
    }


    // jsdoc
    isWebHit() {
        return !isUndefined(this.web) && isTrue(this.web.collided);
    }


    // jsdoc
    isWebBroken() {
        return !isTrue(this.webBroken);
    }


    processWebBurst() {
        this.webBroken = true;
        this.applyDamage(10);
        this.playSound(this.amorHit);
        if (!this.throwResetTime) {
            this.throwResetTime = world.time + 200;
        }
    }


    // jsdoc
    isThrowTime() {
        return super.isAttack() && this.isThrowReady();
    }


    // jsdoc
    isThrowReady() {
        return !isTrue(this.thrown) && isGreater(this.nextThrow, world.time);
    }


    processWebThrow() {
        this.thrown = true;
        this.throwDone = false;
        if (!this.throwDoneTime) {
            this.throwDoneTime = world.time + this.getMs();
        }
    }


    // jsdoc
    getMs() {
        return this.flipBook.attack.length * 100;
    }


    // jsdoc
    setWeb() {
        let x = this.getWebX(this.otherDirection);
        let y = this.getWebY(this.otherDirection);
        this.web = new Web(x, y, this.otherDirection);
    }


    // jsdoc
    getWebX(logical) {
        return (logical) ? this.weapon.xRight - 28 : this.weapon.xLeft - 4;
    }


    // jsdoc
    getWebY() {
        return canvas.height - this.weapon.yBottom - 4;
    }


    // jsdoc
    isAttack() {
        return super.isAttack() && !isTrue(this.throwDone);
    }


    // jsdoc
    isWalk() {
        return false;
    }
}