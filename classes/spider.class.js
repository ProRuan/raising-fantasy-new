class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 36, xRight: 424, yTop: 52, yBottom: 76 };
    thrown = false;
    throwDone = true;
    removeableWeb = false;
    nextThrow = 2500 + getTime();


    // jsdoc
    constructor(x, y) {
        super(source.spider, x, y);

        this.otherDirection = true;

        this.setStateValues(60, 80);
        this.setAct('throw');
        this.animate();
    }


    throw() {
        if (world.webs[this.webId] !== undefined && world.webs[this.webId].x < this.weapon.xLeft) {
            world.webs.splice(this.webId, 1);
            console.log('too far');
            this.thrown = false;
            this.nextThrow = 250 + getTime();
        } else if (world.webs[this.webId] !== undefined && world.webs[this.webId].collided && world.webs[this.webId].img.src.includes('web5')) {
            if (this.removeableWeb == false && world.webs[this.webId].img.src.includes('web5')) {
                this.removeableWeb = true;
                setTimeout(() => {
                    world.webs.splice(this.webId, 1);
                    console.log('collided');
                    this.thrown = false;
                    this.nextThrow = 250 + getTime();
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
            let web = new Web((this.weapon.xRight - 24), (this.weapon.yBottom + 32));    // oDir true (left end)

            this.webId = world.webs.length;
            web.id = world.webs.length;
            web.otherDirection = this.otherDirection;
            world.webs.push(web);

            // for class Web!!!
            // world.webs[0].img.src = world.webs[0].flipBook[2];
        }
    }


    isAttack() {    // maybe with counter + fix spider attack!!!
        return super.isAttack() && this.throwDone == false;
    }


    isWalk() {    // to edit!
        return false;
    }
}