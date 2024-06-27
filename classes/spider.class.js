/**
 * Represents a spider.
 * @extends Enemy
 */
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


    /**
     * Creates a spider.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.spider, x, y);
        this.setEnemy(60, 80, 'throw');
    }


    /**
     * Sets the endpoints of the throw.
     */
    setThrowMax() {
        if (isUndefined(this.throwMaxRight)) {
            this.throwMaxRight = this.getThrowMax(false, 'xRight');
            this.throwMaxLeft = this.getThrowMax(true, 'xLeft');
        }
    }


    /**
     * Throws the web.
     */
    throw() {
        this.setThrowMax();
        this.track();
        this.trigger();
    }


    /**
     * Provides the endpoint of the throw.
     * @param {boolean} value - A boolean value.
     * @param {string} key - The key of the weapon value.
     * @returns {number} - The endpoint of the throw.
     */
    getThrowMax(value, key) {
        this.otherDirection = value;
        return this.weapon[key];
    }


    /**
     * Tracks the hero.
     */
    track() {
        let thisX = this.body.xCenter;
        let heroX = world.hero.body.xCenter;
        this.otherDirection = (!isGreater(thisX, heroX)) ? true : false;
    }


    /**
     * Triggers the web throw and the throw reset.
     */
    trigger() {
        if (this.isThrowTimeout()) {
            this.resetThrowParameters();
        } else if (this.isThrowReset()) {
            this.resetThrow();
        } else if (this.isWebBurst()) {
            this.processWebBurst();
        } else if (this.isThrowDone()) {
            this.setThrowDone();
        } else if (this.isThrowTime()) {
            this.throwWeb();
        }
    }


    /**
     * Verifies, if the timeout of the throw is reached.
     * @returns {boolean} - A boolean value.
     */
    isThrowTimeout() {
        return this.isThrowMax(this.web, true) || this.isThrowMax(this.web, false);
    }


    /**
     * Verifies, if the web has reached the endpoint of the throw.
     * @param {Web} web - The web to verify.
     * @param {boolean} logical - A boolean value.
     * @returns {boolean} - A boolean value.
     */
    isThrowMax(web, logical) {
        if (isTrue(logical)) {
            return this.isWebExisting(web, true) && isGreater(web.x, this.throwMaxLeft);
        } else if (!isTrue(logical)) {
            return this.isWebExisting(web, false) && isGreater(this.throwMaxRight, web.x + web.width);
        }
    }


    /**
     * Verifies, if a web exists.
     * @param {Web} web - The web to verify.
     * @param {boolean} logical - A boolean value.
     * @returns {boolean} - A boolean value.
     */
    isWebExisting(web, logical) {
        if (isTrue(logical)) {
            return !isUndefined(web) && isTrue(web.otherDirection);
        } else if (!isTrue(logical)) {
            return !isUndefined(web) && !isTrue(web.otherDirection);
        }
    }


    /**
     * Resets the parameters of the throw.
     */
    resetThrowParameters() {
        this.removeWeb();
        this.thrown = false;
        this.nextThrow = getSum(this.throwDelay, getTime());
    }


    /**
     * Removes the web.
     */
    removeWeb() {
        this.web.stop(true);
        delete this.web;
    }


    /**
     * Verifies, if the throw is to reset.
     * @returns {boolean} - A boolean value.
     */
    isThrowReset() {
        return this.throwResetTime && isGreater(this.throwResetTime, world.time);
    }


    /**
     * Resets the throw.
     */
    resetThrow() {
        this.resetThrowParameters();
        this.webBroken = false;
        this.nextThrow = getSum(world.time, 1000);
        delete this.throwResetTime;
    }


    /**
     * Verifies the burst of the web.
     * @returns {boolean} - A boolean value.
     */
    isWebBurst() {
        let webHit = !isUndefined(this.web) && isTrue(this.web.collided);
        let webBroken = !isTrue(this.webBroken);
        return webHit && webBroken;
    }


    /**
     * Processes the burst of the web.
     */
    processWebBurst() {
        this.webBroken = true;
        this.applyDamage(10);
        this.playSound(this.amorHit);
        if (!this.throwResetTime) {
            this.throwResetTime = getSum(world.time, 200);
        }
    }


    /**
     * Verifies, if the throw is done.
     * @returns {boolean} - A boolean value.
     */
    isThrowDone() {
        return this.throwDoneTime && isGreater(this.throwDoneTime, world.time);
    }


    /**
     * Sets the throw done.
     */
    setThrowDone() {
        this.throwDone = true;
        delete this.throwDoneTime;
    }


    /**
     * Verifies the time of throw.
     * @returns {boolean} - A boolean value.
     */
    isThrowTime() {
        let throwReady = !isTrue(this.thrown) && isGreater(this.nextThrow, world.time);
        return super.isAttack() && throwReady;
    }


    /**
     * Throws the web of the spider.
     */
    throwWeb() {
        this.processWebThrow();
        this.setWeb();
    }


    /**
     * Processes the throw of the web.
     */
    processWebThrow() {
        this.thrown = true;
        this.throwDone = false;
        if (!this.throwDoneTime) {
            this.throwDoneTime = getSum(world.time, this.getMs());
        }
    }


    /**
     * Provides the milliseconds of the throw animation.
     * @returns {number} - The milliseconds of the throw animation.
     */
    getMs() {
        return this.flipBook.attack.length * 100;
    }


    /**
     * Sets the web.
     */
    setWeb() {
        let x = this.getWebX(this.otherDirection);
        let y = this.getWebY(this.otherDirection);
        this.web = new Web(x, y, this.otherDirection);
    }


    /**
     * Provides the x value of the web.
     * @param {boolean} logical - A boolean value.
     * @returns {number} - The x value of the web.
     */
    getWebX(logical) {
        return (logical) ? this.weapon.xRight - 28 : this.weapon.xLeft - 4;
    }


    /**
     * Provides the y value of the web.
     * @returns {number} - The y value of the web.
     */
    getWebY() {
        return canvas.height - this.weapon.yBottom - 4;
    }


    /**
     * Verifies, if the attack animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isAttack() {
        return super.isAttack() && !isTrue(this.throwDone);
    }


    /**
     * Verifies, if the walk animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isWalk() {
        return false;
    }
}