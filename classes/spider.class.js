class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 36, xRight: 424, yTop: 52, yBottom: 76 };
    thrown = false;
    throwDone = true;
    removeableWeb = false;
    nextThrow = 0;


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

        let web = this.getWeb();

        if (this.isThrowMax(web, true) || this.isThrowMax(web, false)) {
            console.log('too far', world.webs[this.webId].otherDirection, this.throwMaxRight);
            world.webs.splice(this.webId, 1);
            this.thrown = false;
            this.nextThrow = 500 + getTime();
        } else if (world.webs[this.webId] !== undefined && world.webs[this.webId].collided && world.webs[this.webId].img.src.includes('web5')) {
            if (this.removeableWeb == false && world.webs[this.webId].img.src.includes('web5')) {
                this.removeableWeb = true;
                setTimeout(() => {
                    world.webs.splice(this.webId, 1);
                    console.log('collided');
                    this.thrown = false;
                    this.nextThrow = 500 + getTime();
                    this.removeableWeb = false;
                }, 100 / 3);
            }
        } else if (super.isAttack() && this.thrown == false && isLarger(this.nextThrow, world.time)) {
            this.thrown = true;
            this.throwDone = false;
            setTimeout(() => {
                this.throwDone = true;
            }, this.flipBook.attack.length * 100);
            // let web = new Web((this.weapon.xLeft) / 64, (this.weapon.yBottom + 32) / 64);    // oDir false
            // let web = new Web((this.weapon.xRight - 32) / 64, (this.weapon.yBottom + 32) / 64);    // oDir true
            // let web = new Web((this.weapon.xLeft), (this.weapon.yBottom + 32));    // oDir true (left end)
            let web;
            if (isTrue(this.otherDirection)) {
                web = new Web((this.weapon.xRight - 24), (this.weapon.yBottom + 32));    // oDir true (left end)
            } else {
                web = new Web((this.weapon.xLeft - 4), (this.weapon.yBottom + 32));    // oDir true (left end)
            }


            this.webId = world.webs.length;
            web.id = world.webs.length;
            web.otherDirection = this.otherDirection;
            world.webs.push(web);

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
    getWeb() {
        return world.webs[this.webId];
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


    isAttack() {    // maybe with counter + fix spider attack!!!
        return super.isAttack() && this.throwDone == false;
    }


    isWalk() {    // to edit!
        return false;
    }
}